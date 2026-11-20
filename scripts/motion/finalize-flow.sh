#!/usr/bin/env bash
# Turn raw Google Flow downloads (1080p, 24 fps, ~8 s, not looping) into site-ready media:
#   - 30 fps via frame blending (24 fps judders on 60 Hz screens; motion-compensated
#     minterpolate is >5 min per 1080p clip, blending is seconds and fine for slow camera moves)
#   - seamless loop: the last second cross-fades into the first second
#   - H.264 High, yuv420p, faststart, no audio
#   - <id>.jpg poster from the first frame
#
# Usage: scripts/motion/finalize-flow.sh <raw-dir> [out-dir]
#   <raw-dir>/<id>.mp4  ->  <out-dir>/<id>.mp4 + <id>.jpg   (default out-dir: public/media/flow)
set -euo pipefail

RAW=${1:?usage: finalize-flow.sh <raw-dir> [out-dir]}
OUT=${2:-public/media/flow}
FADE=1
mkdir -p "$OUT"

for src in "$RAW"/*.mp4; do
  id=$(basename "$src" .mp4)
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  tail_start=$(awk -v d="$dur" -v f="$FADE" 'BEGIN{printf "%.4f", d-f}')
  echo "== $id (${dur}s)"
  ffmpeg -v error -y -i "$src" -filter_complex "
    [0:v]framerate=fps=30:interp_start=0:interp_end=255:scene=100,split=3[a][b][c];
    [a]trim=start=${FADE}:end=${tail_start},setpts=PTS-STARTPTS[body];
    [b]trim=start=${tail_start},setpts=PTS-STARTPTS[tail];
    [c]trim=start=0:end=${FADE},setpts=PTS-STARTPTS[head];
    [tail][head]xfade=transition=fade:duration=${FADE}:offset=0[seam];
    [body][seam]concat=n=2:v=1:a=0,format=yuv420p[v]" \
    -map "[v]" -r 30 -c:v libx264 -profile:v high -crf 22 -preset slow \
    -movflags +faststart -an "$OUT/$id.mp4"
  ffmpeg -v error -y -i "$OUT/$id.mp4" -frames:v 1 -q:v 3 "$OUT/$id.jpg"
done
echo "done"
