import * as Figma from 'figma-js';

const VECTOR_TYPES = ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE'];
const GROUP_TYPES = ['GROUP', 'BOOLEAN_OPERATION'];

export function colorString(color: Figma.Color) {
  return `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(
    color.b * 255
  )}, ${color.a})`;
}

export function dropShadow({ offset, radius, color }: Figma.Effect) {
  if (offset && color) {
    return `${offset.x}px ${offset.y}px ${radius}px ${colorString(color)}`;
  }
  return '';
}

export function innerShadow({ offset, radius, color }: Figma.Effect) {
  if (offset && color) {
    return `inset ${offset.x}px ${offset.y}px ${radius}px ${colorString(color)}`;
  }
  return '';
}

export function imageURL(hash: string) {
  const squash = hash.split('-').join('');
  return `url(https://s3-us-west-2.amazonaws.com/figma-alpha/img/${squash.substring(
    0,
    4
  )}/${squash.substring(4, 8)}/${squash.substring(8)})`;
}

export function backgroundSize(scaleMode: string) {
  if (scaleMode === 'FILL') {
    return 'cover';
  }
  return '';
}

export function getPaint(paintList?: ReadonlyArray<Figma.Paint>) {
  if (paintList && paintList.length > 0) {
    return paintList[paintList.length - 1];
  }

  return null;
}

export function paintToLinearGradient(paint: Figma.Paint) {
  const handles = paint.gradientHandlePositions;
  const gradientStops = paint.gradientStops;

  if (!handles || !gradientStops) {
    return '';
  }
  const handle0 = handles[0];
  const handle1 = handles[1];

  const ydiff = handle1.y - handle0.y;
  const xdiff = handle0.x - handle1.x;

  const angle = Math.atan2(-xdiff, -ydiff);
  const stops = gradientStops
    .map((stop) => {
      return `${colorString(stop.color)} ${Math.round(stop.position * 100)}%`;
    })
    .join(', ');
  return `linear-gradient(${angle}rad, ${stops})`;
}

export function paintToRadialGradient(paint: Figma.Paint) {
  if (!paint.gradientStops) {
    return '';
  }
  const stops = paint.gradientStops
    .map((stop) => {
      return `${colorString(stop.color)} ${Math.round(stop.position * 60)}%`;
    })
    .join(', ');

  return `radial-gradient(${stops})`;
}
