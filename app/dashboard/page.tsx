import Protected from "@/components/Protected";

export default function DashboardPage() {
  return (
    <Protected>
      <div>Protected dashboard content</div>
    </Protected>
  );
}
