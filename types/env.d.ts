export interface Board {
  id: string;
  title: string;
  image?: string;
}

export interface Rectangle {
  id: string;
  boardId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}
