export interface TabComponentProps {
  lyrics: string;
  sentiment: { label: string; confidence: number };
  genre: string | string[];
  decisionValues: number[];
}

export interface TabComponent {
  render: () => JSX.Element;
}
