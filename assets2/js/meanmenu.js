/*!
* jQuery mean2Menu v2.0.8
* @Copyright (C) 2012-2014 Chris Wharton @ mean2Themes (https://github.com/mean2themes/mean2Menu)
*
*/
/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
* HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
* FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
* OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
* COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
* BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
* DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://gnu.org/licenses/>.
*
* Find more information at http://www.mean2themes.com/plugins/mean2menu/
*
*/
(function ($) {
	"use strict";
		$.fn.mean2menu = function (options) {
				var defaults = {
						mean2MenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
						mean2MenuContainer: 'body', // Choose where mean2menu will be placed within the HTML
						mean2MenuClose: "X", // single character you want to represent the close menu button
						mean2MenuCloseSize: "18px", // set font size of close button
						mean2MenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
						mean2RevealPosition: "right", // left right or center positions
						mean2RevealPositionDistance: "0", // Tweak the position of the menu
						mean2RevealColour: "", // override CSS colours for the reveal background
						mean2ScreenWidth: "480", // set the screen width you want mean2menu to kick in at
						mean2NavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
						mean2ShowChildren: true, // true to show children in the menu, false to hide them
						mean2ExpandableChildren: true, // true to allow expand/collapse children
						mean2RemoveAttrs: false, // true to remove classes and IDs, false to keep them
						onePage: false, // set to true for one page sites
						mean2Display: "block", // override display method for table cell based layouts e.g. table-cell
						removeElements: "" // set to hide page elements
				};
				options = $.extend(defaults, options);

				// get browser width
				var currentWidth = window.innerWidth || document.documentElement.clientWidth;

				return this.each(function () {
						var mean2Menu = options.mean2MenuTarget;
						var mean2Container = options.mean2MenuContainer;
						var mean2MenuClose = options.mean2MenuClose;
						var mean2MenuCloseSize = options.mean2MenuCloseSize;
						var mean2MenuOpen = options.mean2MenuOpen;
						var mean2RevealPosition = options.mean2RevealPosition;
						var mean2RevealPositionDistance = options.mean2RevealPositionDistance;
						var mean2RevealColour = options.mean2RevealColour;
						var mean2ScreenWidth = options.mean2ScreenWidth;
						var mean2NavPush = options.mean2NavPush;
						var mean2RevealClass = ".mean2menu-reveal";
						var mean2ShowChildren = options.mean2ShowChildren;
						var mean2ExpandableChildren = options.mean2ExpandableChildren;
						var mean2Expand = options.mean2Expand;
						var mean2RemoveAttrs = options.mean2RemoveAttrs;
						var onePage = options.onePage;
						var mean2Display = options.mean2Display;
						var removeElements = options.removeElements;

						//detect known mobile/tablet usage
						var isMobile = false;
						if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ) {
								isMobile = true;
						}

						if ( (navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i)) ) {
							// add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
								jQuery('html').css("overflow-y" , "scroll");
						}

						var mean2RevealPos = "";
						var mean2Centered = function() {
							if (mean2RevealPosition === "center") {
								var newWidth = window.innerWidth || document.documentElement.clientWidth;
								var mean2Center = ( (newWidth/2)-22 )+"px";
								mean2RevealPos = "left:" + mean2Center + ";right:auto;";

								if (!isMobile) {
									jQuery('.mean2menu-reveal').css("left",mean2Center);
								} else {
									jQuery('.mean2menu-reveal').animate({
											left: mean2Center
									});
								}
							}
						};

						var menuOn = false;
						var mean2MenuExist = false;


						if (mean2RevealPosition === "right") {
								mean2RevealPos = "right:" + mean2RevealPositionDistance + ";left:auto;";
						}
						if (mean2RevealPosition === "left") {
								mean2RevealPos = "left:" + mean2RevealPositionDistance + ";right:auto;";
						}
						// run center function
						mean2Centered();

						// set all styles for mean2-reveal
						var $navreveal = "";

						var mean2Inner = function() {
								// get last class name
								if (jQuery($navreveal).is(".mean2menu-reveal.mean2close")) {
										$navreveal.html(mean2MenuClose);
								} else {
										$navreveal.html(mean2MenuOpen);
								}
						};

						// re-instate original nav (and call this on window.width functions)
						var mean2Original = function() {
							jQuery('.mean2-bar,.mean2-push').remove();
							jQuery(mean2Container).removeClass("mean2-container");
							jQuery(mean2Menu).css('display', mean2Display);
							menuOn = false;
							mean2MenuExist = false;
							jQuery(removeElements).removeClass('mean2-remove');
						};

						// navigation reveal
						var showmean2Menu = function() {
								var mean2Styles = "background:"+mean2RevealColour+";color:"+mean2RevealColour+";"+mean2RevealPos;
								if (currentWidth <= mean2ScreenWidth) {
								jQuery(removeElements).addClass('mean2-remove');
									mean2MenuExist = true;
									// add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean2-container'
									jQuery(mean2Container).addClass("mean2-container");
									jQuery('.mean2-container').prepend('<div class="mean2-bar"><a href="#nav" class="mean2menu-reveal" style="'+mean2Styles+'">Show Navigation</a><nav class="mean2-nav"></nav></div>');

									//push mean2Menu navigation into .mean2-nav
									var mean2MenuContents = jQuery(mean2Menu).html();
									jQuery('.mean2-nav').html(mean2MenuContents);

									// remove all classes from EVERYTHING inside mean2menu nav
									if(mean2RemoveAttrs) {
										jQuery('nav.mean2-nav ul, nav.mean2-nav ul *').each(function() {
											// First check if this has mean2-remove class
											if (jQuery(this).is('.mean2-remove')) {
												jQuery(this).attr('class', 'mean2-remove');
											} else {
												jQuery(this).removeAttr("class");
											}
											jQuery(this).removeAttr("id");
										});
									}

									// push in a holder div (this can be used if removal of nav is causing layout issues)
									jQuery(mean2Menu).before('<div class="mean2-push" />');
									jQuery('.mean2-push').css("margin-top",mean2NavPush);

									// hide current navigation and reveal mean2 nav link
									jQuery(mean2Menu).hide();
									jQuery(".mean2menu-reveal").show();

									// turn 'X' on or off
									jQuery(mean2RevealClass).html(mean2MenuOpen);
									$navreveal = jQuery(mean2RevealClass);

									//hide mean2-nav ul
									jQuery('.mean2-nav ul').hide();

									// hide sub nav
									if(mean2ShowChildren) {
											// allow expandable sub nav(s)
											if(mean2ExpandableChildren){
												jQuery('.mean2-nav ul ul').each(function() {
														if(jQuery(this).children().length){
																jQuery(this,'li:first').parent().append('<a class="mean2-expand" href="#" style="font-size: '+ mean2MenuCloseSize +'">'+ mean2Expand +'</a>');
														}
												});
												jQuery('.mean2-expand').on("click",function(e){
														e.preventDefault();
															if (jQuery(this).hasClass("mean2-clicked")) {
																jQuery(this).prev('ul').slideUp(300, function(){});
																jQuery(this).parent().removeClass('dropdown-opened');
														} else {
																jQuery(this).prev('ul').slideDown(300, function(){});
																jQuery(this).parent().addClass('dropdown-opened');
														}
														jQuery(this).toggleClass("mean2-clicked");
												});
											} else {
													jQuery('.mean2-nav ul ul').show();
											}
									} else {
											jQuery('.mean2-nav ul ul').hide();
									}

									// add last class to tidy up borders
									jQuery('.mean2-nav ul li').last().addClass('mean2-last');
									$navreveal.removeClass("mean2close");
									jQuery($navreveal).click(function(e){
										e.preventDefault();
								if( menuOn === false ) {
												$navreveal.css("text-align", "center");
												$navreveal.css("text-indent", "0");
												$navreveal.css("font-size", mean2MenuCloseSize);
												jQuery('.mean2-nav ul:first').slideDown();
												menuOn = true;
										} else {
											jQuery('.mean2-nav ul:first').slideUp();
											menuOn = false;
										}
											$navreveal.toggleClass("mean2close");
											mean2Inner();
											jQuery(removeElements).addClass('mean2-remove');
									});

									// for one page websites, reset all variables...
									if ( onePage ) {
										jQuery('.mean2-nav ul > li > a:first-child').on( "click" , function () {
											jQuery('.mean2-nav ul:first').slideUp();
											menuOn = false;
											jQuery($navreveal).toggleClass("mean2close").html(mean2MenuOpen);
										});
									}
							} else {
								mean2Original();
							}
						};

						if (!isMobile) {
								// reset menu on resize above mean2ScreenWidth
								jQuery(window).resize(function () {
										currentWidth = window.innerWidth || document.documentElement.clientWidth;
										if (currentWidth > mean2ScreenWidth) {
												mean2Original();
										} else {
											mean2Original();
										}
										if (currentWidth <= mean2ScreenWidth) {
												showmean2Menu();
												mean2Centered();
										} else {
											mean2Original();
										}
								});
						}

					jQuery(window).resize(function () {
								// get browser width
								currentWidth = window.innerWidth || document.documentElement.clientWidth;

								if (!isMobile) {
										mean2Original();
										if (currentWidth <= mean2ScreenWidth) {
												showmean2Menu();
												mean2Centered();
										}
								} else {
										mean2Centered();
										if (currentWidth <= mean2ScreenWidth) {
												if (mean2MenuExist === false) {
														showmean2Menu();
												}
										} else {
												mean2Original();
										}
								}
						});

					// run main menuMenu function on load
					showmean2Menu();
				});
		};
})(jQuery);
