// Strict Mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a 'strict' operating context.
// This strict context prevents certain actions from being taken and throws more exceptions.
// And:

// Strict mode helps out in a couple ways:

// It catches some common coding bloopers, throwing exceptions.
// It prevents, or throws errors, when relatively 'unsafe' actions are taken (such as gaining access to the global object).
// It disables features that are confusing or poorly thought out.

// When the below is set to true, the comment below enables use strict globally

/*jshint strict: false */

(function() {
    'use strict';
    // this anonymous function is strict...

    // Store selectors
    var elTextEffect = document.querySelectorAll('.heading-wrapper .heading span'),
        elImgsIn = document.querySelectorAll('.slide-left img, .slide-right img'),
        elImgsLeft = document.querySelectorAll('.slide-left img'),
        elImgsRight = document.querySelectorAll('.slide-right img'),
        elCtaReveal = document.querySelectorAll('.cta'),
        elCtaFadeIn = document.querySelectorAll('.join-now-cta'),
        elSheen = document.querySelectorAll('.sheen'),
        matchesTable = document.querySelectorAll('.matches-table'),
        elCards = document.querySelectorAll('.card'),
        front = document.querySelectorAll('.front'),
        back = document.querySelectorAll('.back'),
        casinoInteractive = document.querySelectorAll('.casino-interactive');

    // Get document width
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Create new timeline
    var tl = new TimelineMax({
            paused: true
        }),

        // Tween - H1 Box Text Effect
        myTextEffect = new SplitText(elTextEffect, {
            type: 'words, chars'
        }),
        chars = myTextEffect.chars; // an array of all the divs that wrap each character

    TweenLite.set(elTextEffect, {
        perspective: 400
    });
    // Do the slide images in function if page IS Casino Interactive
    if (casinoInteractive.length > 0) {
        imgsIn();
    }
    tl.staggerFrom(chars, 0.8, {
        autoAlpha: 0,
        scale: 0,
        y: 80,
        z: 200,
        transformOrigin: '0% 50% -50',
        ease: Back.easeOut.config(1.7)
    }, 0.06);

    // Set initial position for easing of images in from left and right
    TweenLite.set(elImgsLeft, {
        x: '-100%',
        scale: 0.5,
        transformOrigin: '0 100%'
    });
    TweenLite.set(elImgsRight, {
        x: '100%',
        scale: 0.5,
        transformOrigin: '0 100%'
    });

    // Tween - Ease images in from left and right
    function imgsIn() {
        tl.staggerTo(elImgsLeft, 1, {
            autoAlpha: 1,
            x: '+=100%',
            scale: 1,
            ease: Back.easeOut.config(1.5)
        }, 0, '-=0.025');
        tl.staggerTo(elImgsRight, 1, {
            autoAlpha: 1,
            x: '-=100%',
            scale: 1,
            ease: Back.easeOut.config(1.5)
        }, 0, '-=1.025');
    }

    // Tween - Interactive cards (Casino interactive)
    if (elCards.length > 0) {
        TweenLite.set(elCards, {
            transformStyle: 'preserve-3d'
        });
        TweenLite.set(front, {
            rotationY: -180
        });
        TweenLite.set([front, back], {
            backfaceVisibility: 'hidden'
        });
        tl.staggerTo(elCards, 0.5, {
            autoAlpha: 1,
            scale: 1,
            ease: Back.easeOut.config(1.2)
        }, 0.3);
        tl.staggerTo(elCards, 0.3, {
            rotationY: -180,
            ease: Back.easeOut
        }, 0.3);
    }

    // Do the slide images in function if page ISN'T Casino Interactive
    if (casinoInteractive.length === 0) {
        imgsIn();
    }

    // Tween - Matches table (Sports only) 'mobile'
    //if (w > 767) {
    if (matchesTable.length > 0) {
        tl.to(matchesTable, 1, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: Back.easeOut.config(1.05)
        });
    }
    //}

    // Tween - CTA reveal
    if (w > 767) {
        tl.staggerTo(elCtaReveal, 0.8, {
            autoAlpha: 1,
            x: 0,
            ease: Back.easeInOut.config(1.1)
        }, 0.8, '+=0.2');
    } else {
        tl.staggerTo(elCtaReveal, 0.8, {
            autoAlpha: 1,
            y: 0,
            ease: Bounce.easeOut
        }, 0.8, '+=0.2');
    }

    // Tween - CTA fade in
    tl.staggerTo(elCtaFadeIn, 0.6, {
        autoAlpha: 1,
        scale: 1,
        ease: Back.easeInOut.config(1.7)
    }, 0, '+=0.2');

    // Tween - Button sheen
    tl.fromTo(elSheen, 1.5, {
        backgroundPosition: '-320px 0'
    }, {
        backgroundPosition: '40px 0',
        repeat: -1,
        repeatDelay: 5
    }, '+=5');

    // Cache tweens in timeline
    tl.progress(1).progress(0);

    // Play timeline
    tl.play();
    // Store globally for later usage
    var selectedCard,
        randNum;

    // Card interactivity - delay start to prevent early click (callback not possible due to tween cache)
    // Zepto.js plugin usage begins here
    setTimeout(function() {
        var $cardWrapper = $('.card-wrapper'),
            $videoOverlay = $('.video-overlay'),
            runOnce = false; // user interaction should only occur once

        $($cardWrapper).on('click', function() {
            if (runOnce === false) {
                // Determine which video to play
                var selectedCard = $(this).data('card'),
                    randNum = Math.floor(Math.random() * 2) + 1;

                // Create new timeline for card animations
                var tlCards = new TimelineMax();

                TweenLite.set($cardWrapper, {
                    perspective: 800
                });

                // Turn card to back
                tlCards.staggerTo(elCards, 0.3, {
                    rotationY: 0,
                    ease: Back.easeOut
                }, 0.3);

                // Move cards to middle
                tlCards.to($cardWrapper, 0.6, {
                    x: 0,
                    ease: Back.easeIn
                });

                // Shuffle cards
                tlCards.staggerFromTo(elCards, 0.6, {
                    x: 0,
                    z: 0,
                    ease: Back.easeIn
                }, {
                    x: 150,
                    z: 200,
                    yoyo: true,
                    repeat: 3,
                    rotationY: 360,
                    ease: Back.easeIn
                }, 0.3, '+=0.3');

                // Reveal video overlay
                tlCards.to($videoOverlay, 0.7, {
                    autoAlpha: 1,
                    onComplete: videoReveal,
                    onCompleteParams: [selectedCard, randNum]
                });
                runOnce = true;
            }
        });
    }, 5000);

    // Random video picker and player
    function videoReveal(selectedCard, randNum) {
        // Determine which video should play
        var videoToPlay,
            selectedVideo = selectedCard + randNum,
            msg = document.getElementById('msg');

        switch (selectedVideo) {
            case 'player1':
                videoToPlay = document.getElementById('player1');
                break;
            case 'player2':
                videoToPlay = document.getElementById('player2');
                break;
            case 'dealer1':
                videoToPlay = document.getElementById('dealer1');
                break;
            case 'dealer2':
                videoToPlay = document.getElementById('dealer2');
                break;
            case 'tie1':
                videoToPlay = document.getElementById('tie1');
                break;
            case 'tie2':
                videoToPlay = document.getElementById('tie2');
                break;

            default:
                document.getElementById('tie1');
                break;
        }
        // Fade in
        TweenLite.to(videoToPlay, 0.2, {
            autoAlpha: 1,
            onComplete: playVideo
        });

        // Play video
        function playVideo() {
            setTimeout(function() {
                videoToPlay.play();
            }, 400);
        }

        // Hide video once ended
        videoToPlay.addEventListener('ended', videoEnded, false);

        function videoEnded() {
            TweenLite.to(videoToPlay, 0.5, {
                autoAlpha: 0,
                onComplete: winnerMsg
            });
        }

        // Display message once video ended tween is complete
        function winnerMsg() {
            TweenLite.to(videoToPlay, 0.5, {
                autoAlpha: 0
            });
            TweenLite.to(msg, 0.5, {
                autoAlpha: 1
            });
            // Hide video overlay on click
            var $vidWrapper = $('.video-overlay');
            $($vidWrapper).on('click', function() {
                TweenLite.to([$vidWrapper, msg], 0.3, {
                    autoAlpha: 0
                });
                //TweenMax.killAll();
            });
        }
    }

    // Load XML feed
    function loadDoc() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "get-feed.html", true);
        xhttp.send();
    }
    loadDoc();


}());

(function() {
    // this anonymous function is sloppy...
}());
