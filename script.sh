#!/bin/bash
echo ""

# Memeriksa dan mengatur renderer otomatis
if [ -z "$render" ]; then
    if [ -n "$(getprop ro.hardware.vulkan)" ]; then
        render="skiagl"
    elif [ -n "$(getprop ro.hardware.opengl)" ]; then
        render="opengl"
    else
        render="vulkan"
    fi
fi

# Mengatur renderer
setprop debug.hwui.renderer "$render"

# Mengatur skala animasi
settings put global window_animation_scale 0.5
settings put global transition_animation_scale 0.5
settings put global animator_duration_scale 0.5
cmd power set-fixed-performance-mode-enabled true
cmd power set-adaptive-power-saver-enabled false

# Memeriksa keberhasilan pengaturan mode kinerja tetap
echo -n '<p style="color: #ff5503;"> Aldo icikiwir </p>'
echo -n '<p style="color: #ff5503;">╔══════════════✧══════════════╗</p>'
echo -n '<p style="color: #ff5503;">║       Core-Flex V.6          ║</p>'
echo -n '<p style="color: #ff5503;">╚══════════════✧══════════════╝</p>'
echo -n '<p style="color: #ff5503;">╔═════════════════════════════╗</p>'
echo -n '<p style="color: #ff5503;">║    Developer : @Chermodsc    ║</p>'
echo -n '<p style="color: #ff5503;">║    Thanks to : @fahrezone    ║</p>'
echo -n '<p style="color: #ff5503;">║    Version   : 6.0           ║</p>'
echo -n '<p style="color: #ff5503;">╚═════════════════════════════╝</p>'
echo -n '<p style="color: #1e90ff;">-> Modules: Online</p>'
echo -n '<p style="color: #1e90ff;">-> Date   : '$(date)'</p>'

FFBIASA="com.dts.freefireth"
display_info=$(dumpsys display)
fps=$(echo "$display_info" | grep -oE 'fps=[0-9.]+' | awk -F '=' '{printf "%d\n", $2+0}' | head -n 1)

echo -n '<p style="color: #ff5503;">╔══════════════✧══════════════╗</p>'
echo -n '<p style="color: #1e90ff;">[ + ] Auto render: '$render'</p>'
echo -n '<p style="color: #1e90ff;">[ + ] Setting game FPS to '$fps'</p>'
echo -n '<p style="color: #32cd32;"> [ + ] Enabling fixed performance mode</p>'
if [ $? -eq 0 ]; then
    echo -n '<p style="color: #32cd32;">[ + ] Fixed performance mode enabled successfully</p>'
else
    echo -n '<p style="color: #ff4500;">[ x ] Failed to enable fixed performance mode</p>'
fi

echo -n '<p style="color: #ff5503;">╚══════════════✧══════════════╝</p>'
cmd notification post -S messaging --conversation "GVR - GAME VORTEX" --message "[ CORE FLEX V6.0 ]: V - MODS" "GVR - GAME VORTEX" "Active successful" > /dev/null 2>&1 &
