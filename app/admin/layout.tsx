export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-[#F0F0F0]">
        {children}
      </div>
    )
  }