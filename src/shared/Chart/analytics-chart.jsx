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
              className="px-0 py-2 mr-6 data-[state=active]:border-b-2 data-[state=active]:border-[#e86317] data-[state=active]:text-[#e86317] rounded-none text-[#667085] bg-transparent">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            {data[tab.id] &&
            //   <div className="h-64 relative">
            //     <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-[#667085]">
            //       {yAxis.map((y, i) => {
            //         return <div key={i}>{y}</div>;
            //       })}
            //     </div>
            //     <div className="ml-8 h-full flex items-end">
            //       {data[tab.id].values.map((value, index) => (
            //         <div
            //           key={index}
            //           className="flex flex-col items-center mx-2 flex-1">
            //           <div
            //             className="w-full bg-[#fdc842] rounded-t"
            //             style={{ height: `${value}%` }}></div>
            //           <div className="mt-2 text-xs text-[#667085]">
            //             {data[tab.id].labels[index]}
            //           </div>
            //           {data[tab.id].subLabels && (
            //             <div className="text-xs text-[#667085]">
            //               {data[tab.id].subLabels[index]}
            //             </div>
            //           )}
            //         </div>
            //       ))}
            //     </div>
            //     <div className="absolute left-8 right-0 top-0 bottom-16 flex flex-col justify-between">
            //       <div className="border-b border-[#e4e7ec]"></div>
            //       <div className="border-b border-[#e4e7ec]"></div>
            //       <div className="border-b border-[#e4e7ec]"></div>
            //       <div className="border-b border-[#e4e7ec]"></div>
            //     </div>
            //   </div>
            type === "bar" ? (
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
