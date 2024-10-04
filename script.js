import Axeron from '/axeron.js';
import AxConstant from '/axConstant.js';

function setSwitchState(id, state) {
    localStorage.setItem(id, state);
}

function getSwitchState(id) {
    return localStorage.getItem(id) === 'true';
}

function executeBashCommand() {
    var command = `
set_window_size_and_density() {
    target_width=1000

    current_window_size=\$(cmd window size | cut -f3 -d " " | head -n 1)
    current_height=\$(echo "\$current_window_size" | cut -d'x' -f2)
    current_width=\$(echo "\$current_window_size" | cut -d'x' -f1)

    new_height=\$(printf "%.0f" "\$(echo "\$current_height * \$target_width / \$current_width" | bc -l)")

    cmd window size "\${target_width}x\${new_height}"

    current_density=\$(cmd window density | cut -f3 -d " " | head -n 1)
    new_density=\$(echo "\$current_density * \$target_width / \$current_width" | bc)

    cmd window density "\$new_density"
}

set_window_size_and_density
`;

    Axeron.exec(command)
        .then(() => {
        })
        .catch(() => {
        });
}


document.querySelectorAll('input[type="checkbox"]')[0].addEventListener('change', function() {
    if (this.checked) {
        setSwitchState('sensitivity', true);
        executeBashCommand();
            Axeron.toast("SETTINGS AIM", "Sensitivity Width Enabled");
    } else {
        setSwitchState('sensitivity', false);

        Axeron.exec("wm size reset && wm density reset").catch(() => {
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const sensitivityToggle = document.querySelectorAll('input[type="checkbox"]')[0];
    sensitivityToggle.checked = getSwitchState('sensitivity');
    sensitivityToggle.addEventListener('change', function() {
        if (this.checked) {
            setSwitchState('sensitivity', true);
            executeBashCommand();
        } else {
            setSwitchState('sensitivity', false);
            Axeron.toast("SETTINGS AIM OF", "Sensitivity Width Disabled");
            Axeron.exec("wm size reset && wm density reset").catch(() => {
            });
        }
    });

    const tweakingToggle = document.querySelectorAll('input[type="checkbox"]')[1];
    tweakingToggle.checked = getSwitchState('tweaking');
    tweakingToggle.addEventListener('change', function() {
        if (this.checked) {
            setSwitchState('tweaking', true);
            Axeron.exec("cmd game set --mode 2 --downscale 0.9 --fps 120 com.dts.freefireth && device_config put game_overlay com.dts.freefireth mode=2,downscaleFactor=0.9,fps=120 && settings put system game_mode 2")
            Axeron.toast("SETTINGS AIM", "Downscale Factor Enabled");

        } else {
            setSwitchState('tweaking', false);
            Axeron.toast("SETTINGS AIM", "Downscale Factor Disabled");
            Axeron.exec("cmd game set --mode 1 --downscale 0.7 --fps 60 com.dts.freefireth && device_config put game_overlay com.dts.freefireth mode=1,downscaleFactor=0.7,fps=60 && settings put system game_mode 1")
        }
    });

    const headtrackingToggle = document.querySelectorAll('input[type="checkbox"]')[2];
    headtrackingToggle.checked = getSwitchState('headtracking');
    headtrackingToggle.addEventListener('change', function() {
        if (this.checked) {
            setSwitchState('headtracking', true);
            Axeron.toast("SETTINGS AIM", "Touch Responsive Enabled");
            Axeron.exec("settings put global window_animation_scale 0.5 && settings put global transition_animation_scale 0.5 && settings put global animator_duration_scale 0.5")
            Axeron.exec("settings put system touch.pressure.scale 0.001 && settings put system touch.size.calibration geometric && settings put system touch.pressure.calibration amplitude && settings put system touch.size.scale 1 &&. settings put system touch.distance.scale 0")
        } else {
            setSwitchState('headtracking', false);
            Axeron.toast("SETTINGS AIM", "Touch Responsive Disabled");
            Axeron.exec("settings put global window_animation_scale 1 && settings put global transition_animation_scale 1 && settings put global animator_duration_scale 1")
            Axeron.exec("settings delete system touch.pressure.scale && settings delete system touch.size.calibration && settings delete system touch.pressure.calibration && settings delete system touch.size.scale && settings delete system touch.distance.scale")
        }
    });

    const touchResponsiveToggle = document.querySelectorAll('input[type="checkbox"]')[3];
    touchResponsiveToggle.checked = getSwitchState('touchResponsive');
    touchResponsiveToggle.addEventListener('change', function() {
        if (this.checked) {
            setSwitchState('touchResponsive', true);
            Axeron.toast("SETTINGS AIM", "Headtracking Free Fire");
Axeron.exec(` 
FILE="/storage/emulated/0/VortexModules/SettAim/webroot/settings.xml"
update_settings() {
    xmlstarlet ed -L \
        -u "/settings/game_settings/game/sensitivity/general" -v "200" \
        -u "/settings/game_settings/game/sensitivity/red_dot" -v "90" \
        -u "/settings/game_settings/game/sensitivity/2x_scope" -v "80" \
        -u "/settings/game_settings/game/sensitivity/4x_scope" -v "70" \
        -u "/settings/game_settings/game/sensitivity/awm_scope" -v "60" \
        -u "/settings/game_settings/game/sensitivity/shotgun" -v "85" \
        -u "/settings/game_settings/game/sensitivity/smg" -v "75" \
        -u "/settings/game_settings/game/sensitivity/sniper" -v "55" \
        -u "/settings/game_settings/game/sensitivity/pistol" -v "95" \
        -u "/settings/game_settings/game/sensitivity/throwables" -v "100" \
        "$FILE"

    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "general" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "red_dot" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "2x_scope" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "4x_scope" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "awm_scope" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "shotgun" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "smg" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "sniper" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "pistol" -n "$FILE"
    xmlstarlet sel -t -m "/settings/game_settings/game/sensitivity" -v "throwables" -n "$FILE"
}
update_settings
`);

        } else {
            setSwitchState('touchResponsive', false);

        }
    });
});

class MyComponent {
    constructor() {
        this.textId = document.getElementById("id");
        this.initComponent();
    }

    initComponent() {
        if (this.textId) {
            this.textId.textContent = AxConstant.AX_ID;
        } else {
            console.log("Element with ID 'id' not found");
        }
    }
}

const component = new MyComponent();

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 120,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.7,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 2, // Mengurangi ukuran untuk efek lebih cepat
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 100, // Mengurangi jarak penghubung untuk tampilan lebih dinamis
            "color": "#ffffff",
            "opacity": 0.6,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 12, // Meningkatkan kecepatan
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

document.getElementById("play-button").addEventListener("click", function() {
    Axeron.optimizeApp();
    Axeron.toast("SETTINGS AIM V7.0", "Copyright @Chermodsc");
});
