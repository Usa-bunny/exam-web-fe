import { Icon } from "@phosphor-icons/react";

interface MetricCardProps {
  icon: Icon;
  label: string;
  value: any;
}

const MetricCard = ({ icon: Icon, label, value }: MetricCardProps) => {
  return (
    <div className="bg-linear-to-b from-[#D9DFFE] to-white border-4 border-[#3843F61A] bg-clip-padding rounded-[18px] p-5 flex flex-col gap-4 shadow-[0_2px_4px_-1px_rgba(16,24,40,0.05)]">
      <div className="w-10 h-10 bg-white rounded-xl shadow-[0_1px_2px_rgba(16,24,40,0.05)] border border-[#F0F2F5] flex items-center justify-center">
        <Icon size={24} weight="fill" className="text-[#3843F6]" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <span className="text-3xl font-medium text-[#1D2939] font-sans tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
};

export default MetricCard;
