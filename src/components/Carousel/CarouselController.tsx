import './CarouselController.css';

export enum Direction {
  Left = 'LEFT',
  Right = 'Right',
}

interface Props {
  direction: Direction;
  clickHandler: (direction: Direction) => void;
}

export function CarouselController({ direction, clickHandler }: Props) {
  const icon = direction === Direction.Left ? '<' : '>';

  const handleClick = () => clickHandler(direction);
  return (
    <button className={`carousel-controller ${direction}`} name={direction} onClick={handleClick}>
      {icon}
    </button>
  );
}
