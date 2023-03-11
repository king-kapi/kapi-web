import PartyOption from '@/components/PartyOptions';
import SideNav from '@/components/SideNav';

export default function PartyFinderTestPage() {
  return (
    <div className="PartyFinderTestPage">
      <style>{`body {margin: 0;} .PartyFinderTestPage{display: flex;}`}</style>
      <SideNav />
      <PartyOption />
    </div>
  );
}
