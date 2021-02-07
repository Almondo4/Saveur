<?php



/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


$router->group(['prefix'=>'api/v1','middleware'=>'auth'],function() use($router){
//
//    $router->group(['prefix'=>'tables'],function() use($router){

        $router->post('tables/add','TableController@create');
       // $router->post('tables/add',['middleware'=>'options','uses'=>'TableController@create']);
        $router->get('tables/view/{id}','TableController@view');
        $router->put('tables/edit/{id}','TableController@update');
        $router->delete('tables/delete/{position}','TableController@delete');
        $router->get('tables/retrieve','TableController@index');
        $router->post('tables/createEdit','TableController@createEdit');



//    });

//    $router->group(['prefix'=>'reservations'],function() use($router){

        $router->post('/reservations/add',['middleware'=>'schedule','uses'=>'ReservationController@reserver']);
        $router->get('/reservations/view','ReservationController@view');
        $router->get('/reservations/daily','ReservationController@dailyReservations');
        $router->put('/reservations/edit/{id}','ReservationController@update');
        $router->delete('/reservations/cancel/{id}','ReservationController@delete');
        $router->put('/reservations/update/{id}','ReservationController@update');
        $router->get('reservations/freeTables','ReservationController@possibleReservations');
        $router->get('reservations/index','ReservationController@index');
        $router->get('/reservations/findReservationByname','ReservationController@findReservationByname');

//    });

    $router->group(['prefix'=>'/users'],function() use($router){

        $router->get('/view/{id}','UserController@view');
        $router->get('/search/{username}','UserController@search');
        $router->post('/edit','UserController@update');
        $router->delete('/delete/{id}','UserController@delete');
        $router->get('/retrieve','UserController@index');
        $router->put('/logout','UserController@logout');
        $router->get('/account','UserController@me');
        $router->get('/pics/{id}','ProductController@pics');

    });
    $router->get('me','UserController@tts');
        $router->post('reductions/{id}/{token}','ReductionController@assigne');
        $router->post('roles/add','RoleController@create');

        //Order
    $router->post('orders/add','OrderController@create');
    $router->put('orders/addToCart/{id_product}','OrderController@addToOrder');
    $router->delete('orders/remove/{pivot_id}','OrderController@removeFromOrder');
    $router->get('orders/index',['middleware'=>'admin','uses'=>'OrderController@index']);
    $router->get('orders/view','OrderController@view');
    $router->delete('orders/delete/{id}','OrderController@delete');
    $router->get('orders/calculate','OrderController@calculatePrice');
    $router->put('orders/applyCoupon','OrderController@applyCoupon');

        //Cart
    $router->post('cart/add','CartController@addToCart');
    $router->delete('cart/remove/{id}','CartController@removeFromCart');
    $router->post('cart/submit/{reservation_id}','CartController@submit');
    $router->get('cart/view','CartController@view');







    //schedule & exceptions
    $router->put('schedule/edit',['middleware'=>'admin', 'uses'=>'ScheduleController@update']);
    $router->post('exceptions/add',['middleware'=>'admin', 'uses'=>'ScheduleController@addException']);
    $router->put('exceptions/edit/{id}',['middleware'=>'admin', 'uses'=>'ScheduleController@updateException']);
    $router->post('exceptions/createEdit',['middleware'=>'admin', 'uses'=>'ScheduleController@createEdit']);
    $router->delete('exceptions/delete/{id}',['middleware'=>'admin', 'uses'=>'ScheduleController@deleteException']);


        //products
    $router->post('products/add','ProductController@create');
    $router->post('products/edit/{id}','ProductController@update');
    $router->get('products/index','ProductController@index');
    $router->get('products/view/{id}','ProductController@view');
    $router->put('products/availability/{id}','ProductController@available');
    $router->post('products/createEdit','ProductController@createEdit');



    $router->delete('products/delete/{id}','ProductController@delete');
    $router->get('products/pics/{id}','ProductController@pics');


    //photos
    $router->post('images/add','PhotoController@create');
    $router->put('images/edit/{id}','PhotoController@update');
    $router->get('images/index','PhotoController@index');
    $router->get('images/view/{id}','PhotoController@view');
    $router->delete('images/delete/{id}','PhotoController@update');

        //roles
    $router->post('roles/add','RoleController@create');
    $router->put('roles/edit/{id}','RoleController@update');
    $router->get('roles/index','RoleController@index');
    $router->get('roles/view/{id}','RoleController@view');
    $router->delete('roles/delete/{id}','RoleController@update');
    $router->put('roles/giveRole/{id}','RoleController@giveRole');

        //events
    $router->post('events/add','EventController@create');
    $router->put('events/edit/{id}','EventController@update');
    $router->post('events/createEdit','EventController@createEdit');
    $router->get('events/view/{id}','EventController@view');
    $router->delete('events/delete/{id}','EventController@delete');
    $router->put('events/giveRole/{id}','EventController@giveRole');

        //reductions
    $router->post('reductions/add','ReductionController@create');
    $router->put('reductions/edit/{id}','ReductionController@update');
    $router->post('reductions/createEdit','ReductionController@createEdit');
    $router->get('reductions/view','ReductionController@view');
    $router->get('reductions/retrieve/{id}','ReductionController@retrieve');
    $router->delete('reductions/delete/{id}','ReductionController@delete');
    $router->put('reductions/giveReduction/{id}','ReductionController@assign');
    $router->put('reductions/activateReduction','ReductionController@activateReduction');
    $router->put('reductions/validate','ReductionController@validateReservation');



});
//          PUBLIC ROUTES
$router->put('/login','UserController@login');
$router->post('/signup','UserController@create');

$router->get('products/newProducts','ProductController@newProducts');
$router->get('products/hotProducts','ProductController@hotProducts');
$router->get('stats/averagePrice','StatsController@average_price');
$router->get('stats/averageLoad','StatsController@average_load');
$router->get('products/menu','ProductController@getMenu');
$router->post('subscribe','UserController@subscribe');

$router->get('api/v1/reductions/index','ReductionController@index');
$router->get('api/v1/events/index','EventController@index');
$router->get('api/v1/exceptions/index','ScheduleController@index');
$router->get('api/v1/exceptions/exceptionDates','ScheduleController@exceptionDates');




$router->get('api/v1/schedule/view','ScheduleController@viewSchedule');
$router->post('test','ScheduleController@test');
$router->post('test2','ScheduleController@test2');
$router->post('schadule/','ScheduleController@update');
$router->post('fares/{id}','PhotoController@show');
