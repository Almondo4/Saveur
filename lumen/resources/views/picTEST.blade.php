
{{Form::open(['route' => 'user.store', 'files' => true])}}

{{Form::label('user_photo', 'User Photo',['class' => 'control-label'])}}
{{Form::file('user_photo')}}
{{Form::submit('Save', ['class' => 'btn btn-success'])}}

{{Form::close()}}

<img src="{{$image}}" />
