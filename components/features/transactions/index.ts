export type Period = "Week" | "Month" | "Year";
export type TransactionTabType = "Transactions" | "Categories";

export interface BarDataItem {
  value: number;
  label: string;
  frontColor: string;
}

export interface PieDataItem {
  value: number;
  color: string;
  text: string;
  count: number;
}

export interface CategoryAmount {
  amount: number;
  positive: boolean;
}

export interface PeriodTrend {
  value: number;
  up: boolean;
}


export const barDataByPeriod: Record<Period, BarDataItem[]> = {
  Week: [
    {value: 820, label: "Mon", frontColor: "#E8D9EC"},
    {value: 1200, label: "Tue", frontColor: "#E8D9EC"},
    {value: 650, label: "Wed", frontColor: "#E8D9EC"},
    {value: 1800, label: "Thu", frontColor: "#E8D9EC"},
    {value: 5712, label: "Fri", frontColor: "#56034C"},
    {value: 430, label: "Sat", frontColor: "#E8D9EC"},
    {value: 290, label: "Sun", frontColor: "#E8D9EC"},
  ],
  Month: [
    {value: 12400, label: "W1", frontColor: "#E8D9EC"},
    {value: 9800, label: "W2", frontColor: "#E8D9EC"},
    {value: 15600, label: "W3", frontColor: "#56034C"},
    {value: 11200, label: "W4", frontColor: "#E8D9EC"},
  ],
  Year: [
    {value: 42000, label: "Jan", frontColor: "#E8D9EC"},
    {value: 38000, label: "Feb", frontColor: "#56034C"},
    {value: 51000, label: "Mar", frontColor: "#E8D9EC"},
    {value: 47000, label: "Apr", frontColor: "#E8D9EC"},
    {value: 53000, label: "May", frontColor: "#E8D9EC"},
    {value: 49000, label: "Jun", frontColor: "#E8D9EC"},
    {value: 61000, label: "Jul", frontColor: "#E8D9EC"},
    {value: 58000, label: "Aug", frontColor: "#E8D9EC"},
    {value: 44000, label: "Sep", frontColor: "#E8D9EC"},
    {value: 67000, label: "Oct", frontColor: "#E8D9EC"},
    {value: 72000, label: "Nov", frontColor: "#E8D9EC"},
    {value: 55000, label: "Dec", frontColor: "#E8D9EC"},
  ],
};

export const totalByPeriod: Record<Period, number> = {
  Week: 571215,
  Month: 4900000,
  Year: 63700000,
};

export const trendByPeriod: Record<Period, PeriodTrend> = {
  Week: {value: 10, up: false},
  Month: {value: 5, up: true},
  Year: {value: 18, up: true},
};

export const pieData: PieDataItem[] = [
  {value: 40, color: "#56034C", text: "Shops", count: 2},
  {value: 25, color: "#EB1254", text: "Supermarkets", count: 2},
  {value: 20, color: "#BC005B", text: "Education", count: 4},
  {value: 10, color: "#890058", text: "Transport", count: 3},
  {value: 5, color: "#E8D9EC", text: "Other", count: 1},
];

export const categoryAmounts: Record<string, CategoryAmount> = {
  Shops: {amount: 1590, positive: false},
  Supermarkets: {amount: 150000, positive: true},
  Education: {amount: 15000, positive: false},
  Transport: {amount: 8500, positive: false},
  Other: {amount: 2000, positive: false},
};

export const maxValueByPeriod: Record<Period, number> = {
  Week: 7000,
  Month: 20000,
  Year: 80000,
};