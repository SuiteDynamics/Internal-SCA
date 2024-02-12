
define(
	'SD.LodgeReservationDemo.MyCoolModule'
,   [
		'SD.LodgeReservationDemo.MyCoolModule.View',
		'jQuery',
		'Backbone',
		'underscore'
	]
,   function (
		MyCoolModuleView,
		jQuery,
		Backbone,
		_
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{


			console.log('lodge')
			/** @type {LayoutComponent} */
			var layout2 = container.getComponent('Layout');
			var layout = container.getLayout();
			//layout.once('afterAppendView', _.bind(this.loadScript, self));


			if(layout2)
			{
				layout2.addChildView('Quantity', function() { 
					return new MyCoolModuleView({ container: container });
				});
			}

		}

			
		
	};
});
