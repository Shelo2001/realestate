<html>
<body>
    <p><strong>From:</strong> {{ $emailData['email'] }}</p>
    <strong>Hello, I am {{$emailData['name']}}</p>
    <br/><br/><br/>
    <p>{{ $emailData['message'] }}</p>
</body>
</html>