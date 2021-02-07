
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Authentication</title>
    </head>
    <body>
        <h1>login</h1>

        {{Form::open(array('route'=>'session.store'))}}
    <div>
        {{Form::label('email','Email')}}
        {{Form::text('email')}}
    </div>
    <div>
        {{Form::label('password','password')}}
        {{Form::text('password')}}
    </div>
    <div>
        {{Form::submit('login')}}
    </div>

        {{Form::close()}}
    </body>
</html>