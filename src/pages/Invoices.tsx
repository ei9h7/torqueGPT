import React from 'react'
import { Receipt, Plus } from 'lucide-react'

const Invoices: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and manage customer invoices
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Plus className="h-4 w-4 mr-2" />
          New Invoice
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center py-12">
            <Receipt className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Completed jobs will generate invoices automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices