import ExpenseForm from "@/components/ExpenseForm"
import ExpenseList from "@/components/ExpenseList"
import CategoryForm from "@/components/CategoryForm"

export default function Home() {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-light-green to-cream">
      <h1 className="text-4xl font-bold mb-8 text-forest-green text-center">Green Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Add Expense</h2>
            <ExpenseForm />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Add Category</h2>
            <CategoryForm />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-leaf-green">Expenses</h2>
          <ExpenseList />
        </div>
      </div>
    </div>
  )
}

