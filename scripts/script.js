$(function(){
    getWeatherData('ua', dataReceived, showError);

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // ³�������� �� UTC  � ����������
        var city = data.city.name;
        var country = data.city.country;

        $.each(data.list, function(){
            // "this" ����� ��'��� �������� �����: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // ���������� ��� � UTC � ���������
            addWeather(
                this.weather[0].icon,
                moment(localTime).calendar(),	// ������������� moment.js ��� ������������� ����
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );
        });
        $('#location').html(city + ', <b>' + country + '</b>'); // ������ ������� �� �������
    }

    function addWeather(icon, day, condition, temp){
        var markup = '<tr>'+
                '<td>' + day + '</td>' +
                '<td>' + '<img src="images/icons/'+ icon +'.png" />' + '</td>' +
                '<td>' + temp + '</td>' +
                '<td>' + condition + '</td>'
            + '</tr>';
        weatherTable.insertRow(-1).innerHTML = markup; // ������ ����� �� �������
    }

    function showError(msg){
        $('#error').html('������� �������: ' + msg);
    }
});
