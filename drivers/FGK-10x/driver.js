"use strict";

const path			= require('path');
const ZwaveDriver	= require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/766

module.exports = new ZwaveDriver( path.basename(__dirname), {
	capabilities: {
		'alarm_contact': {
			'command_class'				: 'COMMAND_CLASS_SENSOR_ALARM',
			'command_get'				: 'SENSOR_ALARM_GET',
			'command_get_parser'		: function(){
				return {
					'Sensor Type': 'General Purpose Alarm'
				}
			},
			'command_report'			: 'SENSOR_ALARM_REPORT',
			'command_report_parser'		: function( report ){
				if( report['Sensor Type'] !== 'General Purpose Alarm' )
					return null;

				return report['Sensor State'] === 'alarm';
			}
		},
		'measure_battery': {
			'command_class'				: 'COMMAND_CLASS_BATTERY',
			'command_get'				: 'BATTERY_GET',
			'command_report'			: 'BATTERY_REPORT',
			'command_report_parser'		: function( report ) {
				if( report['Battery Level'] === "battery low warning" ) return 1;
				return report['Battery Level (Raw)'][0];
			}
		}
	}
})