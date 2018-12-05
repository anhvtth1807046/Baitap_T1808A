(function () {
    "use strict";
    var Music;

    var listSong = {
        "playlist": []
    };

    var limitSong = 18;

    Music = (function () {
        function Music() {
            this.initLandingPage();
            this.initSelect();
            this.addResizeActions();
            this.initResizeActions();
            this.initSearchNavigation();
            this.initSearch();
            this.initMobileMenu();
            this.initFooterHeights();
            this.initArtistContainers();
            this.initSliders();
            this.initProductHover();
            this.initSmoothNavigation();
            this.initAlbumContainers();
            // this.initRatingInput();
            // this.initProductCountForm();
            this.initProductInfo();
            this.readMoreSong();
            this.getFreeSong();
            this.initPlaylist();
            // this.initModals();
            this.initSvgs();
        }

        Music.prototype.initSvgs = function () {
            var cart, wishlist;
            wishlist = $('.add-to-wishlist-button');
            wishlist.click(function () {
                var action, item;
                item = $(this);
                if (item.hasClass("added")) {
                    item.find('.added-animate-first').each(function () {
                        return this.beginElement();
                    });
                    return item.removeClass("added");
                } else {
                    item.find('.animate-first').each(function () {
                        return this.beginElement();
                    });
                    action = function () {
                        return item.find('.animate-second').each(function () {
                            return this.beginElement();
                        });
                    };
                    setTimeout(action, 200);
                    return item.addClass("added");
                }
            });
            cart = $('.add-to-cart-button');
            return cart.click(function () {
                var action2, action4, action5, item;
                item = $(this);
                if (item.hasClass("added")) {
                    item.find('.added-animate-first').each(function () {
                        return this.beginElement();
                    });
                    action2 = function () {
                        return item.find('.added-animate-second').each(function () {
                            return this.beginElement();
                        });
                    };
                    setTimeout(action2, 200);
                    return item.removeClass("added");
                } else {
                    item.find('.animate-first').each(function () {
                        return this.beginElement();
                    });
                    action4 = function () {
                        return item.find('.animate-second').each(function () {
                            return this.beginElement();
                        });
                    };
                    setTimeout(action4, 200);
                    action5 = function () {
                        return item.find('.animate-third').each(function () {
                            return this.beginElement();
                        });
                    };
                    setTimeout(action5, 400);
                    return item.addClass("added");
                }
            });
        };

        // Music.prototype.initModals = function () {
        //     $('header').find('.modal').find('.register').click(function () {
        //         $('#login-modal').modal('hide');
        //         return $('#register-modal').modal('show');
        //     })
        //         .end()
        //         .find('.log-in').click(function () {
        //         $('#register-modal').modal('hide');
        //         return $('#login-modal').modal('show');
        //     })
        //         .end()
        //         .find('.forgot').click(function () {
        //         $('#login-modal').modal('hide');
        //         return $('#forgot-modal').modal('show');
        //     });
        //
        //     $('.modal').on('show.bs.modal', function () {
        //         var dialog, item, offset;
        //         item = $(this);
        //         item.css('display', 'block');
        //         dialog = item.find(".modal-dialog");
        //         offset = ($(window).height() - item.find(".modal-content").height()) / 2;
        //         return dialog.css("margin-top", offset);
        //     });
        //     return $('#view-review-modal').on('show.bs.modal', function () {
        //         return $('.review-slider').flexslider({
        //             animation: "slide",
        //             controlNav: true,
        //             directionNav: false,
        //             animationLoop: true,
        //             slideshow: false
        //         });
        //     });
        // };

        // Lay danh sach bai hat push vao array playlist de truyen vao ham getPlaylist de nghe nhac.
        Music.prototype.initPlaylist = function () {
            return $.ajax({
                type: 'GET',
                url: 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-free-songs',
                success: (function (_this) {
                    return function (data) {
                        var newSong;
                        data.reverse();
                        for (let i = 0; i < data.length; i++) {
                            var index = i + 1;
                            newSong = {
                                "index": index.toString(),
                                "title": data[i].name,
                                "artist": data[i].name,
                                "mp3": data[i].link,
                                "author": data[i].singer,
                                "song_id": data[i].id,
                                "thumbnail": data[i].thumbnail
                            };
                            listSong.playlist.push(newSong);

                        }
                        return _this.getPlaylist(listSong.playlist);
                    };
                })(this),
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        };

        // Chi in ra bai hat ben index.
        Music.prototype.getFreeSong = function () {
            var API_GET_FREE_SONG = 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-free-songs';
            return $.ajax({
                url: API_GET_FREE_SONG,
                type: 'GET',
                success: function (res) {
                    res.reverse();
                    var symbol, colorText;
                    symbol = '0123456789ABCDEF';
                    let htmlContent = "";
                    for (var i = 0; i < res.length; i++) {
                        // var int = Math.floor(Math.random() * 10000);
                        colorText = '#';

                        // TEXT COLOR cho phần tử index chẵn

                        // if (i % 2 === 0) {
                        //     for (var j = 0; j < 6; j++) {
                        //         colorText = colorText + symbol[Math.floor(Math.random() * 16)];
                        //     }
                        // }

                        // TEXT COLOR cho phần tử index 0, 1, 2, 3, 4, 5.
                        if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5) {
                            for (var j = 0; j < 6; j++) {
                                colorText = colorText + symbol[Math.floor(Math.random() * 16)];
                            }
                        }
                        if (i == limitSong) break;

                        htmlContent += '<div class="col-lg-2 col-md-3 col-sm-6">\n' +
                            '<div class="song" style="height: 180px; margin-bottom: 100px;" >\n' +
                            '<figure><div class="background" style="background: url(' + res[i].thumbnail + ') ' +
                            'no-repeat 50% 50%; background-size: cover; height: 155px;width: 100%;border-radius: 5px"></div>\n' +
                            '<div class="overlay">\n' +
                            '<div class="background" style="background: url(' + res[i].thumbnail + ') ' +
                            'no-repeat 50% 50%; background-size: cover; height: 155px;width: 100%;border-radius: 5px"></div>\n' +
                            '<div class="icons">\n' +
                            '<ul>\n' +
                            '<li>\n' +
                            '<button class="add-to-cart-button">\n' +
                            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">\n' +
                            '<g class="base">\n' +
                            '<polygon fill="transparent" stroke="#231F20" stroke-width="2" stroke-miterlimit="10" points="35.818,37 14,37 15.091,16 35,16  ">\n' +
                            '<animate attributeType="XML" class="animate-first added-animate-first" attributeName="points" from="35.818,37 14,37 15.091,16 35,16   " to="34.818,36 15,36 16.091,15 34,15" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-second added-animate-second" attributeName="points" from="34.818,36 15,36 16.091,15 34,15" to="35.818,37 14,37 15.091,16 35,16  " begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '</polygon>\n' +
                            '<rect x="17" y="13" fill="transparent" stroke="#231F20" stroke-width="2" stroke-miterlimit="10" width="16" height="3">\n' +
                            '<animate attributeType="XML" class="animate-first added-animate-first" attributeName="x" from="17" to="18" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-second added-animate-second" attributeName="x" from="18" to="17" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-first added-animate-first" attributeName="y" from="13" to="11" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-second added-animate-second" attributeName="y" from="11" to="13" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-first added-animate-first" attributeName="width" from="16" to="14" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-second added-animate-second" attributeName="width" from="14" to="16" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-first added-animate-first" attributeName="height" from="3" to="4" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate attributeType="XML" class="animate-second added-animate-second" attributeName="height" from="4" to="3" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '</rect>\n' +
                            '</g>\n' +
                            '<g class="plus">\n' +
                            '<line class="first" fill="white" stroke="#231F20" stroke-width="2" stroke-miterlimit="10" x1="25" y1="22" x2="25" y2="30">\n' +
                            '<animate class="animate-second" attributeName="x1" from="25" to="20" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second" attributeName="y1" from="22" to="26" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second" attributeName="x2" from="25" to="23.828" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second" attributeName="y2" from="30" to="29.828" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-third" attributeName="x1" from="20" to="22.5" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-third" attributeName="y1" from="26" to="24" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-third" attributeName="x2" from="23.828" to="28.5" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-third" attributeName="y2" from="29.828" to="30" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="x1" from="22.5" to="25" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="y1" from="24" to="22" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="x2" from="28.5" to="25" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="y2" from="30" to="30" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '</line>\n' +
                            '<line class="second" fill="white" stroke="#231F20" stroke-width="2" stroke-miterlimit="10" x1="21" y1="26" x2="29" y2="26">\n' +
                            '<animate class="animate-first" attributeName="x2" from="29" to="31" begin="indefinite" dur="0.1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second" attributeName="x1" from="21" to="23.465" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second" attributeName="y1" from="26" to="29.535" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second" attributeName="x2" from="31" to="31" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second" attributeName="y2" from="26" to="23" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +

                            '<animate class="animate-third" attributeName="x1" from="23.465" to="22.5" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-third" attributeName="y1" from="29.535" to="30" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-third" attributeName="x2" from="31" to="28.5" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-third" attributeName="y2" from="23" to="24" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +

                            '<animate class="added-animate-first" attributeName="x1" from="22.5" to="21" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="y1" from="30" to="26" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="x2" from="28.5" to="29" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="y2" from="24" to="26" begin="indefinite" dur="0.2s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '</line>\n' +
                            '</g>\n' +
                            '</svg>\n' +
                            '</button>\n' +
                            '</li>\n' +
                            '<li>\n' +
                            '<li><a href="javascript:void(0)" data-play="' + (i + 1) + '" class="play-song-individual"><i class="music-player-play-outline"></i></a><a href="#" class="pause-song"><i class="music-player-pause"></i></a></li>' +
                            '</li>\n' +
                            '<li>\n' +
                            '<button class="add-to-wishlist-button">\n' +
                            '<svg version="1.1" x="0px" y="0px" width="40px"height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\n' +
                            '<g id="top">\n' +
                            '<path fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M32.584,20.462 c1.396-1.46,2.161-3.374,2.161-5.39c0-4.288-3.476-7.777-7.744-7.777c-2.44,0-4.681,1.143-6.126,3.018h-0.007 c-1.444-1.875-3.683-3.018-6.124-3.018C10.476,7.295,7,10.784,7,15.072c0,2.016,0.765,3.93,2.161,5.39l5.058,4.882">\n' +
                            '<animate class="animate-first" attributeName="d"from="M32.584,20.462 c1.396-1.46,2.161-3.374,2.161-5.39c0-4.288-3.476-7.777-7.744-7.777c-2.44,0-4.681,1.143-6.126,3.018h-0.007 c-1.444-1.875-3.683-3.018-6.124-3.018C10.476,7.295,7,10.784,7,15.072c0,2.016,0.765,3.93,2.161,5.39l5.058,4.882"to="M30.883,20.732c1.396-1.459,2.161-3.375,2.161-5.39c0-4.288-3.476-7.777-7.744-7.777c-2.44,0-4.68,1.143-6.126,3.018h-0.007 c-1.444-1.875-3.683-3.018-6.124-3.018c-4.268,0-7.744,3.489-7.744,7.777c0,2.016,0.766,3.93,2.161,5.39l5.058,4.883"begin="indefinite"dur="0.1s"fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="d"from=" M30.883,20.732c1.396-1.459,2.161-3.375,2.161-5.39c0-4.288-3.476-7.777-7.744-7.777c-2.44,0-4.68,1.143-6.126,3.018h-0.007 c-1.444-1.875-3.683-3.018-6.124-3.018c-4.268,0-7.744,3.489-7.744,7.777c0,2.016,0.766,3.93,2.161,5.39l5.058,4.883"to="M32.584,20.462 c1.396-1.46,2.161-3.374,2.161-5.39c0-4.288-3.476-7.777-7.744-7.777c-2.44,0-4.681,1.143-6.126,3.018h-0.007 c-1.444-1.875-3.683-3.018-6.124-3.018C10.476,7.295,7,10.784,7,15.072c0,2.016,0.765,3.93,2.161,5.39l5.058,4.882"begin="indefinite"dur="0.1s"fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '</path>\n' +
                            '</g>\n' +
                            '<g id="base">\n' +
                            '<path fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M32.639,20.403 L20.902,31.941l0,0l-6.774-6.69">\n' +
                            '<animate class="animate-first" attributeName="d"from="M32.639, 20.403 L20.902, 31.941l0, 0l-6.774-6.69"to="M27.451, 24.119l-8.25, 8.094l0, 0l-3.337-3.285"begin="indefinite"dur="0.1s"fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="animate-second smooth" attributeName="d" from="M27.451, 24.119l-8.25, 8.094l0, 0l-3.337-3.285" to="M24.473, 27.098l-5.271, 5.115l0, 0" begin="indefinite" dur="1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="d" from="M24.473,27.098l-5.271,5.115l0,0" to="M32.639,20.403 L20.902,31.941l0,0l-6.774-6.69" begin="indefinite" dur="1s" fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '</path>\n' +
                            '<path fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M32.639,20.403\n' +
                            'L20.902,31.941l0,0l-6.774-6.69">\n' +
                            '<animate class="animate-first" attributeName="d"from=" M32.639,20.403 L20.902,31.941l0,0l-6.774-6.69"to="M27.451,24.119l-8.25,8.094l0,0l-3.337-3.285"begin="indefinite"dur="0.1s"fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            ' <animate class="animate-second" attributeName="d"from="M27.451,24.119l-8.25,8.094l0,0l-3.337-3.285"to="M19.201,27.098l5.271,5.115l0,0"begin="indefinite"dur="1s"fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '<animate class="added-animate-first" attributeName="d"from="M19.201,27.098l5.271,5.115l0,0"to="M32.639,20.403 L20.902,31.941l0,0l-6.774-6.69"begin="indefinite"dur="1s"fill="freeze" calcMode="spline" keySplines="0.5 0 0.5 0" />\n' +
                            '</path>\n' +
                            '</g>\n' +
                            '</svg>\n' +
                            '</button>\n' +
                            '</li>\n' +
                            '</ul>\n' +
                            '</div>\n' +
                            '</div>\n' +
                            '</figure>\n' +
                            '<a href="individual-song.html"  class="title" style="color:' + colorText + ';">' + res[i].name + '</a>' +
                            '<div class="price" style="font-size: 9px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap">' + res[i].author + '</div>\n' +
                            '</div>\n' +
                            '</div>';
                    }
                    $('#listSong').html(htmlContent);
                },
                error: function (msg) {
                    alert('Fails');
                }
            });
        };

        // Lay them 18 bai nua~ . va return new Music();
        Music.prototype.readMoreSong = function () {
            $('#readMoreSong').click(function () {
                limitSong += 18;
                return new Music();
            });
        };

        // Lay bai hat trong tham so truyen vao playlist . Lay value cua thuoc tinh data-play de so danh voi index trong playlist.
        // Index la truong trong array playlist
        Music.prototype.getPlaylist = function (playlist) {
            var myPlaylist, player, songs;
            $('.audio-player').css("top", $(window).height() - 70 + "px");
            player = $("#jpId").jPlayer({
                supplied: "mp3",
                swfPath: "/js",
                verticalVolume: "true",
                cssSelector: {
                    play: ".audio-play",
                    pause: ".audio-pause",
                    stop: ".audio-stop",
                    mute: ".audio-mute",
                    unmute: ".audio-unmute",
                    currentTime: ".currentTime",
                    duration: ".duration",
                    title: ".song-title"
                }
            });
            songs = playlist;
            myPlaylist = new jPlayerPlaylist({
                jPlayer: "#jpId",
                cssSelectorAncestor: ".audio-player"
            }, songs, {
                playlistOptions: {
                    enableRemoveControls: false
                },
                swfPath: "/plugins/jplayer",
                supplied: "mp3",
                smoothPlayBar: true,
                keyEnabled: true,
                audioFullScreen: true
            });
            $('.replay').click(function () {
                var item;
                item = $(this);
                if (item.hasClass('off')) {
                    $('#jpId').bind($.jPlayer.event.ended, function () {
                        return player.jPlayer("play");
                    });
                    item.removeClass('off');
                    item.addClass('on');
                } else {
                    $('#jpId').unbind($.jPlayer.event.ended);
                    item.removeClass('on');
                    item.addClass('off');
                }
                return false;
            });
            $('#jpId').bind($.jPlayer.event.play, function () {
                var author, thumb, song_id;
                author = myPlaylist.playlist[myPlaylist.current].author;
                thumb = myPlaylist.playlist[myPlaylist.current].thumbnail;
                song_id = myPlaylist.playlist[myPlaylist.current].song_id;
                $('.audio-player .song .author').text(author);
                $('.audio-player .song-image').attr('src', thumb);
                //sets an attribute data-id with the id of the song(to know which song is added in the footer player - this is for devs that want to convert it to a dynamic app)
                $('.audio-player .add-to-cart-button, .audio-player .add-to-wishlist-button').data('id', song_id);
            });
            $('.play-song').click(function () {
                var index;
                index = $(this).data("play");
                myPlaylist.play(index - 1);
                return false;
            });

            $('.song').find('.pause-song').click(function () {
                var item;
                item = $(this).closest('.song');
                item.find('.play-song-individual').css('display', 'block');
                item.find('.pause-song').css('display', 'none');
                myPlaylist.pause();
                return false;
            });
            return $('.song').find('.play-song-individual').click(function () {
                var index, item;
                item = $(this).closest('.song');
                $('.play-song-individual').css('display', 'block');
                $('.pause-song').css('display', 'none');
                item.find('.play-song-individual').css('display', 'none');
                item.find('.pause-song').css('display', 'block');
                index = $(this).data("play");
                myPlaylist.play(index - 1);
                return false;
            });
        };

        Music.prototype.initProductInfo = function () {
            return $('.product-info').each(function () {
                var item;
                item = $(this);
                item.find('.close').click(function (event) {
                    event.preventDefault();
                    item.removeClass('info-shown');
                    return item.addClass('info-hidden');
                });
                return item.find('.more').click(function (event) {
                    event.preventDefault();
                    item.addClass('info-shown');
                    return item.removeClass('info-hidden');
                });
            });
        };

        // Music.prototype.initProductCountForm = function () {
        //     var countInput;
        //     countInput = $('.product-add').find('.count');
        //     $('.product-add').find('.minus').click(function (event) {
        //         var countInputValue;
        //         event.preventDefault();
        //         countInputValue = countInput.attr("value");
        //         if (parseInt(countInputValue, 10) - 1 > 1) {
        //             return countInput.attr("value", parseInt(countInputValue, 10) - 1);
        //         } else {
        //             return countInput.attr("value", 1);
        //         }
        //     });
        //     return $('.product-add').find('.plus').click(function (event) {
        //         var countInputValue;
        //         event.preventDefault();
        //         countInputValue = countInput.attr("value");
        //         return countInput.attr("value", parseInt(countInputValue, 10) + 1);
        //     });
        // };

        Music.prototype.initLandingPage = function () {
            var windowHeight, windowWidth;
            windowWidth = $(window).width();
            windowHeight = $(window).height();
            $('body.full-background').css("width", windowWidth + "px");
            return $('body.full-background').css("height", windowHeight + "px");
        };

        // Music.prototype.initRatingInput = function () {
        //     var rating_input = $('.rating-input');
        //     rating_input.find('.stars').find('li').mouseenter(function () {
        //         var index, item;
        //         rating_input.find('.stars').find('li').removeClass("checked");
        //         item = $(this);
        //         index = item.index();
        //         rating_input.find('.stars').find('li:lt(' + index + ')').addClass('checked');
        //         return item.addClass('checked');
        //     });
        //     rating_input.find('.stars').find('li').mouseleave(function (index) {
        //         var item;
        //         item = $(this);
        //         index = item.index();
        //         rating_input.find('.stars').find('li:lt(' + index + ')').removeClass('checked');
        //         item.removeClass('checked');
        //         return rating_input.find('.stars').find('li:lt(' + $('#rating').attr("value") + ')').addClass('checked');
        //     });
        //     return rating_input.find('.stars').find('li').click(function (e) {
        //         var index, item;
        //         rating_input.find('.stars').find('li').removeClass("checked");
        //         item = $(this);
        //         index = item.index();
        //         $('#rating').attr("value", index + 1);
        //         return e.preventDefault();
        //     });
        // };

        Music.prototype.initSmoothNavigation = function () {
            return $('.more-with-navigation').click(function (event) {
                var dest;
                event.preventDefault();
                dest = 0;
                if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                    dest = $(document).height() - $(window).height();
                } else {
                    dest = $(this.hash).offset().top;
                }
                return $('html,body').animate({
                    scrollTop: dest
                }, 1000, 'swing');
            });
        };

        Music.prototype.initProductHover = function () {
            $('.product .with-title-effect').mouseenter(function () {
                var item;
                item = $(this);
                return item.closest('.product').find('.name').css("left", "20px");
            });
            return $('.product .with-title-effect').mouseleave(function () {
                var item;
                item = $(this);
                return item.closest('.product').find('.name').css("left", "0");
            });
        };

        Music.prototype.initSliders = function () {
            var noOfItems, priceSlider, thumbSlider;
            $('.introductory-slider').flexslider({
                animation: "slide",
                controlNav: true,
                directionNav: false,
                animationLoop: true,
                slideshow: false
            });
            thumbSlider = $('.thumb-slider');
            thumbSlider.flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                slideshow: false,
                itemWidth: 100,
                itemMargin: 0,
                asNavFor: '.main-slider'
            });
            $('.main-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                slideshow: false,
                sync: ".thumb-slider"
            });
            noOfItems = thumbSlider.find('.slides').find('li').length;
            thumbSlider.css('margin-left', -(noOfItems * 50) + "px");
            priceSlider = $("#price").slider({});
            if ($('#price').length) {
                return priceSlider.on('slide', function () {
                    var inputSlider,
                        formbox = $('.form-box');
                    inputSlider = formbox.find('#price').attr("value").split(',');
                    formbox.find('.min').text("$" + inputSlider[0]);
                    return formbox.find('.max').text("$" + inputSlider[1]);
                });
            }
        };

        Music.prototype.initFooterHeights = function () {
            var minHeight, windowWidth;
            windowWidth = $(window).width();
            if (windowWidth > 767) {
                minHeight = 0;
                $('.footer-widget').each(function () {
                    var itemHeight;
                    itemHeight = $(this).height();
                    if (minHeight < itemHeight) {
                        return minHeight = itemHeight;
                    }
                });
                return $('.footer-widget').css("height", minHeight + 40 + "px");
            }
        };

        Music.prototype.initSelect = function () {
            $('select').selectric({
                maxHeight: 250
            });
            $('.form-select').find('select').on('selectric-open', function () {
                $(this).closest('.form-box').addClass('no-border');
                return $('.selectricItems').each(function () {
                    var item, itemWidth;
                    item = $(this);
                    itemWidth = Math.round(item.prev('.selectric').width());
                    return item.css("width", itemWidth + 4 + "px");
                });
            });
            return $('.form-select').find('select').on('selectric-close', function () {
                return $(this).closest('.form-box').removeClass('no-border');
            });
        };

        Music.prototype.initSearchNavigation = function () {
            $('.navbar-nav>li').each(function () {
                var item;
                item = $(this);
                if (item.find('>ul').length > 0) {
                    return item.find('.show-more').css("display", "block");
                }
            });
            return $('.navbar-nav>li>a ').click(function (event) {
                event.preventDefault();
                var item;
                item = $(this).closest('li');
                if (item.find('>ul').length > 0) {
                    item.find('>ul').slideToggle();
                    item.find('.show-more').toggle();
                    item.find('.show-less').toggle();
                    return event.preventDefault;
                }
            });
        };

        Music.prototype.initResizeActions = function () {
            return $(window).resize(this.addResizeActions);
        };

        Music.prototype.initArtistContainers = function () {
            var action, windowWidth;
            windowWidth = $(window).width();
            if (windowWidth > 750) {
                action = function () {
                    if ($('.artist-main-container').length && $('.artist-second-container').length) {
                        $('.artist-second-container').css("height", $('.artist-main-container').outerHeight() + "px");
                    }
                    if ($('.artist-songs-container').length && $('.artist-about-container').length) {
                        return $('.artist-about-container').css("height", $('.artist-songs-container').outerHeight() + "px");
                    }
                };
                return setTimeout(action, 100);
            } else {
                $('.artist-second-container').css("height", "350px");
                return $('.artist-about-container').css("height", "auto");
            }
        };

        Music.prototype.initAlbumContainers = function () {
            var action, windowWidth;
            windowWidth = $(window).width();
            if (windowWidth > 750) {
                action = function () {
                    if ($('.album-main-container').length && $('.album-second-container').length) {
                        return $('.album-second-container').not('.full-width').css("height", $('.album-main-container').outerHeight() + "px");
                    }
                };
                return setTimeout(action, 100);
            }
        };

        Music.prototype.addResizeActions = function () {
            var documentHeight, itemWidth, minFooterWidgetHeight, noOfItems, numberOfColumns, rightContainerHeight,
                rightSidebarLinks, searchNavHeight, thumbSlider, windowHeight, windowWidth;
            windowHeight = $(window).height();
            windowWidth = $(window).width();
            documentHeight = $(document).height();
            $('.simple-sidebar').css("height", windowHeight - 94 + "px");
            $('.right-sidebar').css("height", windowHeight - 94 + "px");
            rightSidebarLinks = $('.right-sidebar-links');
            rightSidebarLinks.css("width", windowHeight - 94 + "px");
            rightSidebarLinks.css("top", rightSidebarLinks.width() / 2 - 50 + "px");
            rightSidebarLinks.css("right", -rightSidebarLinks.width() / 2 + 45 + "px");
            $('.links-wrapper').css("height", windowHeight - 94 + "px");
            if ($('.search-navigation').length) {
                $('.search-navigation').removeAttr("style");
                searchNavHeight = $('.search-navigation').height();
                rightContainerHeight = $('.right-container').height();
                if (windowWidth > 691) {
                    if (searchNavHeight < rightContainerHeight) {
                        $('.search-navigation').css("height", rightContainerHeight + 1 + "px");
                    } else {
                        $('.search-navigation').css("height", searchNavHeight + 1 + "px");
                    }
                }
            }
            if (windowWidth > 767) {
                numberOfColumns = $('.song-list-container').find('table').find('th').length;
                $('.hover-row').attr("colspan", numberOfColumns);
            } else {
                $('.hover-row').attr("colspan", "2");
            }
            if (windowWidth < 768) {
                $('.simple-header .navbar-collapse').css("width", windowWidth + "px");
                $('.image-header .navbar-collapse').css("width", windowWidth + "px");
            } else {
                $('.simple-header .navbar-collapse').css("width", "auto");
                $('.image-header .navbar-collapse').css("width", "auto");
            }
            $('.footer-widget').removeAttr("style");
            if (windowWidth > 767) {
                minFooterWidgetHeight = 0;
                $('.footer-widget').each(function () {
                    var itemHeight;
                    itemHeight = $(this).height();
                    if (minFooterWidgetHeight < itemHeight) {
                        return minFooterWidgetHeight = itemHeight;
                    }
                });
                $('.footer-widget').css("height", minFooterWidgetHeight + 40 + "px");
            }

            var artist_main_container = $('.artist-main-container'),
                artist_second_container = $('.artist-second-container'),
                artist_songs_container = $('.artist-songs-container'),
                artist_about_container = $('.artist-about-container'),
                album_main_container = $('.album-main-container'),
                album_second_container = $('.album-second-container');

            if (windowWidth > 767) {
                if (artist_main_container.length && artist_second_container.length) {
                    artist_second_container.css("height", artist_main_container.outerHeight() + "px");
                }
                if (artist_songs_container.length && artist_about_container.length) {
                    artist_about_container.css("height", artist_songs_container.outerHeight() + "px");
                }

                if (album_main_container.length && album_second_container.length) {
                    album_second_container.not('.full-width').css("height", album_main_container.outerHeight() + "px");
                }

            } else {
                artist_second_container.css("height", "350px");
                artist_about_container.css("height", "auto");

                if (album_main_container.length && album_second_container.length) {
                    album_second_container.not('.full-width').css("height", "auto");
                }
            }

            if (windowWidth < 768) {
                $('.search-header').find('.form-control').removeAttr("placeholder");
            }

            $('.full-background').css("width", windowWidth + "px");
            $('.full-background').css("height", windowHeight + "px");
            thumbSlider = $('.thumb-slider');
            noOfItems = thumbSlider.find('.slides').find('li').length;
            itemWidth = thumbSlider.find('.slides').find('li').first().width();
            thumbSlider.css('margin-left', -(noOfItems * itemWidth / 2) + "px");
            return $('.audio-player').css("top", $(window).height() - 70 + "px");
        };

        Music.prototype.initSearch = function () {
            var windowWidth;
            windowWidth = $(window).width();
            if (windowWidth < 768) {
                $('.search-header').find('.form-control').removeAttr("placeholder");
            }
            $('header').find('.search-button').click(function () {
                return $('.search-box').addClass('shown');
            });
            $('.search-box').find('.close-search').click(function () {
                return $('.search-box').removeClass('shown');
            });
            $('.simple-header .search-group').find('.btn').click(function (event) {
                var searchGroup;
                event.preventDefault();
                searchGroup = $('.simple-header .search-group');
                if (searchGroup.hasClass('open')) {
                    return searchGroup.removeClass('open');
                } else {
                    searchGroup.addClass('open');
                    return searchGroup.find('.form-control').focus();
                }
            });
            return $('.image-header .search-group').find('.btn').click(function (event) {
                var searchGroup;
                event.preventDefault();
                searchGroup = $('.image-header .search-group');
                if (searchGroup.hasClass('open')) {
                    return searchGroup.removeClass('open');
                } else {
                    searchGroup.addClass('open');
                    return searchGroup.find('.form-control').focus();
                }
            });
        };

        Music.prototype.initMobileMenu = function () {
            return $('.navbar-nav >li').each(function () {
                var button, el;
                el = $(this);
                button = $('<button class="dropdown-toggle"><i class="fa fa-angle-down"></i></button>');
                if (el.find('>ul').length) {
                    el.append(button);
                    return button.click(function () {
                        var submenu;
                        submenu = $(this).parent().find(">ul");
                        if (submenu.is(':visible')) {
                            submenu.slideUp(300);
                            return $(this).html('<i class="fa fa-angle-down"></i>');
                        } else {
                            submenu.slideDown(300);
                            return $(this).html('<i class="fa fa-angle-up"></i>');
                        }
                    });
                }
            });
        };
        return Music;

    })();

    $(document).ready(function () {
        var musictheme;
        return musictheme = new Music();
    });

}).call(this);


//# sourceMappingURL=main.js.map
