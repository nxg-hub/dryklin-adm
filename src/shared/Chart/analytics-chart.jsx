"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/tabs.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export function AnalyticsChart({
  tabs,
  defaultTab,
  data,
  title,
  period = "Monthly",
  onPeriodChange,
  yAxis,
  type,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-[#344054]">{title}</h2>
        <div className="flex items-center">
          <button
            className="flex items-center"
            onClick={() => onPeriodChange && onPeriodChange(period)}>
            <span className="text-sm text-[#344054] mr-2">{period}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 9L12 15L18 9"
                stroke="#344054"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Tabs defaultValue={defaultTab}>
        <TabsList className="border-b border-[#e4e7ec] w-full justify-start mb-6 bg-transparent p-0">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="px-0 py-2 cursor-pointer mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#e86317] data-[state=active]:text-[#e86317] rounded-none text-[#667085] bg-transparent">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            {data[tab.id] && type === "bar" ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data[tab.id].labels.map((label, index) => ({
                    label,
                    value: data[tab.id].values[index],
                  }))}>
                  <XAxis dataKey="label" />
                  <YAxis ticks={yAxis.map(Number)} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#fdc842" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data[tab.id].labels.map((label, index) => ({
                    label,
                    value: data[tab.id].values[index],
                  }))}>
                  <XAxis dataKey="label" />
                  <YAxis ticks={yAxis.map(Number)} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#e86317"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
