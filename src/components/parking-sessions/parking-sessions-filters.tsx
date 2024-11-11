export type Filters = {
  value: string | number | boolean;
  label: string;
  icon?: string | React.ComponentType<{ className?: string }>;
};
