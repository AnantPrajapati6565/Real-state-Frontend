// // import { useEffect, useState } from 'react'
// // import { toast } from 'react-toastify'
// // import api from '../../services/api'

// // const AdminContacts = () => {
// //   const [contacts, setContacts] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [selectedContact, setSelectedContact] = useState(null)
// //   const [filterStatus, setFilterStatus] = useState('')

// //   useEffect(() => {
// //     fetchContacts()
// //   }, [])

// //   const fetchContacts = async () => {
// //     try {
// //       setLoading(true)
// //       const response = await api.get('/contacts')
// //       setContacts(response.data.data || [])
// //       setLoading(false)
// //     } catch (error) {
// //       console.error('Error fetching contacts:', error)
// //       toast.error('Failed to load contacts')
// //       setLoading(false)
// //     }
// //   }

// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this contact?')) return
    
// //     try {
// //       await api.delete(`/contacts/${id}`)
// //       toast.success('✅ Contact deleted successfully!')
// //       fetchContacts()
// //       if (selectedContact?.id === id) setSelectedContact(null)
// //     } catch (error) {
// //       toast.error('❌ Failed to delete contact')
// //     }
// //   }

// //   const handleStatusUpdate = async (id, status) => {
// //     try {
// //       await api.put(`/contacts/${id}`, { status })
// //       toast.success(`✅ Status updated to ${status}!`)
// //       fetchContacts()
// //       if (selectedContact?.id === id) {
// //         setSelectedContact({ ...selectedContact, status })
// //       }
// //     } catch (error) {
// //       toast.error('❌ Failed to update status')
// //     }
// //   }

// //   const getStatusColor = (status) => {
// //     const colors = {
// //       pending: 'bg-yellow-100 text-yellow-800',
// //       read: 'bg-blue-100 text-blue-800',
// //       replied: 'bg-green-100 text-green-800'
// //     }
// //     return colors[status] || 'bg-gray-100 text-gray-800'
// //   }

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString)
// //     return date.toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     })
// //   }

// //   const filteredContacts = contacts.filter(contact => {
// //     if (filterStatus) return contact.status === filterStatus
// //     return true
// //   })

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading contacts...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="p-6">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
// //         <div>
// //           <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
// //           <p className="text-gray-600 text-sm">Total: {contacts.length} messages</p>
// //         </div>
// //       </div>

// //       {/* Filter */}
// //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// //         <div className="flex flex-wrap gap-2">
// //           <button
// //             onClick={() => setFilterStatus('')}
// //             className={`px-4 py-2 rounded-lg transition-colors ${
// //               filterStatus === '' 
// //                 ? 'bg-blue-600 text-white' 
// //                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //             }`}
// //           >
// //             All ({contacts.length})
// //           </button>
// //           <button
// //             onClick={() => setFilterStatus('pending')}
// //             className={`px-4 py-2 rounded-lg transition-colors ${
// //               filterStatus === 'pending' 
// //                 ? 'bg-yellow-600 text-white' 
// //                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //             }`}
// //           >
// //             Pending ({contacts.filter(c => c.status === 'pending').length})
// //           </button>
// //           <button
// //             onClick={() => setFilterStatus('read')}
// //             className={`px-4 py-2 rounded-lg transition-colors ${
// //               filterStatus === 'read' 
// //                 ? 'bg-blue-600 text-white' 
// //                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //             }`}
// //           >
// //             Read ({contacts.filter(c => c.status === 'read').length})
// //           </button>
// //           <button
// //             onClick={() => setFilterStatus('replied')}
// //             className={`px-4 py-2 rounded-lg transition-colors ${
// //               filterStatus === 'replied' 
// //                 ? 'bg-green-600 text-white' 
// //                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //             }`}
// //           >
// //             Replied ({contacts.filter(c => c.status === 'replied').length})
// //           </button>
// //         </div>
// //       </div>

// //       {/* Selected Contact Detail View */}
// //       {selectedContact && (
// //         <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
// //           <div className="flex justify-between items-start mb-4">
// //             <div>
// //               <h3 className="text-xl font-bold text-gray-900">{selectedContact.full_name}</h3>
// //               <p className="text-gray-600">{selectedContact.email}</p>
// //             </div>
// //             <button
// //               onClick={() => setSelectedContact(null)}
// //               className="text-gray-400 hover:text-gray-600 text-2xl"
// //             >
// //               ✕
// //             </button>
// //           </div>
// //           <div className="mb-4">
// //             <p className="text-sm text-gray-500">Subject</p>
// //             <p className="font-medium">{selectedContact.subject}</p>
// //           </div>
// //           <div className="mb-4">
// //             <p className="text-sm text-gray-500">Message</p>
// //             <p className="bg-gray-50 p-4 rounded-lg">{selectedContact.message}</p>
// //           </div>
// //           <div className="flex flex-wrap gap-3">
// //             <button
// //               onClick={() => handleStatusUpdate(selectedContact.id, 'read')}
// //               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //             >
// //               Mark as Read
// //             </button>
// //             <button
// //               onClick={() => handleStatusUpdate(selectedContact.id, 'replied')}
// //               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// //             >
// //               Mark as Replied
// //             </button>
// //             <button
// //               onClick={() => handleDelete(selectedContact.id)}
// //               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
// //             >
// //               Delete Message
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Contacts Table */}
// //       <div className="bg-white rounded-lg shadow overflow-hidden">
// //         {filteredContacts.length === 0 ? (
// //           <div className="text-center py-12">
// //             <div className="text-6xl mb-4">📧</div>
// //             <p className="text-gray-500 text-lg">No messages found</p>
// //             <p className="text-gray-400 text-sm">Contact messages will appear here</p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Name
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Email
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Subject
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Date
// //                   </th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {filteredContacts.map((contact) => (
// //                   <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
// //                     <td className="px-6 py-4">
// //                       <div className="text-sm font-medium text-gray-900">
// //                         {contact.full_name}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-500">
// //                       {contact.email}
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-900">
// //                       {contact.subject}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}>
// //                         {contact.status}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-500">
// //                       {formatDate(contact.created_at)}
// //                     </td>
// //                     <td className="px-6 py-4 text-sm font-medium">
// //                       <div className="flex gap-2">
// //                         <button
// //                           onClick={() => setSelectedContact(contact)}
// //                           className="text-blue-600 hover:text-blue-900 transition-colors"
// //                         >
// //                           View
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(contact.id)}
// //                           className="text-red-600 hover:text-red-900 transition-colors"
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default AdminContacts




// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import api from '../../services/api'
// import { Mail, Eye, Trash2, CheckCircle, Clock, MessageSquare } from 'lucide-react'

// const AdminContacts = () => {
//   const [contacts, setContacts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedContact, setSelectedContact] = useState(null)
//   const [filterStatus, setFilterStatus] = useState('')

//   useEffect(() => {
//     fetchContacts()
//   }, [])

//   const fetchContacts = async () => {
//     try {
//       setLoading(true)
//       const response = await api.get('/contacts')
//       setContacts(response.data.data || [])
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching contacts:', error)
//       toast.error('Failed to load contacts')
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this contact?')) return
    
//     try {
//       await api.delete(`/contacts/${id}`)
//       toast.success('✅ Contact deleted successfully!')
//       fetchContacts()
//       if (selectedContact?.id === id) setSelectedContact(null)
//     } catch (error) {
//       toast.error('❌ Failed to delete contact')
//     }
//   }

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await api.put(`/contacts/${id}`, { status })
//       toast.success(`✅ Status updated to ${status}!`)
//       fetchContacts()
//       if (selectedContact?.id === id) {
//         setSelectedContact({ ...selectedContact, status })
//       }
//     } catch (error) {
//       toast.error('❌ Failed to update status')
//     }
//   }

//   const getStatusColor = (status) => {
//     const colors = {
//       pending: 'bg-amber-100 text-amber-700',
//       read: 'bg-blue-100 text-blue-700',
//       replied: 'bg-emerald-100 text-emerald-700'
//     }
//     return colors[status] || 'bg-gray-100 text-gray-700'
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     })
//   }

//   const filteredContacts = contacts.filter(contact => {
//     if (filterStatus) return contact.status === filterStatus
//     return true
//   })

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 flex justify-center items-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading contacts...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
//       {/* Header */}
//       <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center">
//         <div>
//           <h2 className="text-3xl font-bold text-slate-800">📬 Contact Messages</h2>
//           <p className="text-gray-500 mt-1">Total: {contacts.length} messages</p>
//         </div>
//       </div>

//       {/* Filter */}
//       <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-5 mb-8">
//         <div className="flex flex-wrap gap-2">
//           {[
//             { label: 'All', value: '', count: contacts.length },
//             { label: 'Pending', value: 'pending', count: contacts.filter(c => c.status === 'pending').length },
//             { label: 'Read', value: 'read', count: contacts.filter(c => c.status === 'read').length },
//             { label: 'Replied', value: 'replied', count: contacts.filter(c => c.status === 'replied').length },
//           ].map((filter) => (
//             <button
//               key={filter.value}
//               onClick={() => setFilterStatus(filter.value)}
//               className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
//                 filterStatus === filter.value
//                   ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
//                   : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//               }`}
//             >
//               {filter.label} ({filter.count})
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Selected Contact Detail View */}
//       {selectedContact && (
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <h3 className="text-2xl font-bold text-slate-800">{selectedContact.full_name}</h3>
//               <p className="text-gray-500">{selectedContact.email}</p>
//             </div>
//             <button
//               onClick={() => setSelectedContact(null)}
//               className="text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               ✕
//             </button>
//           </div>
//           <div className="mb-4">
//             <p className="text-sm text-gray-500 font-medium">Subject</p>
//             <p className="text-slate-700">{selectedContact.subject}</p>
//           </div>
//           <div className="mb-6">
//             <p className="text-sm text-gray-500 font-medium">Message</p>
//             <p className="bg-slate-50 p-4 rounded-xl text-slate-700">{selectedContact.message}</p>
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => handleStatusUpdate(selectedContact.id, 'read')}
//               className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-md"
//             >
//               Mark as Read
//             </button>
//             <button
//               onClick={() => handleStatusUpdate(selectedContact.id, 'replied')}
//               className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition shadow-md"
//             >
//               Mark as Replied
//             </button>
//             <button
//               onClick={() => handleDelete(selectedContact.id)}
//               className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium transition shadow-md"
//             >
//               Delete Message
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Contacts Table */}
//       {filteredContacts.length === 0 ? (
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 py-20 text-center">
//           <div className="text-7xl mb-4">📧</div>
//           <h2 className="text-2xl font-bold text-slate-800">No messages found</h2>
//           <p className="text-gray-500 mt-2">Contact messages will appear here</p>
//         </div>
//       ) : (
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gradient-to-r from-slate-800 to-slate-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
//                     Name
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
//                     Email
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
//                     Subject
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
//                     Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredContacts.map((contact) => (
//                   <tr key={contact.id} className="hover:bg-blue-50 transition duration-300">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
//                           {contact.full_name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="font-semibold text-slate-800">{contact.full_name}</p>
//                           <p className="text-xs text-gray-400">ID #{contact.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
//                     <td className="px-6 py-4 text-sm text-slate-700">{contact.subject}</td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
//                         {contact.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {formatDate(contact.created_at)}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => setSelectedContact(contact)}
//                           className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white transition"
//                         >
//                           👁️ View
//                         </button>
//                         <button
//                           onClick={() => handleDelete(contact.id)}
//                           className="px-4 py-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition"
//                         >
//                           🗑 Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AdminContacts


import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { 
  Mail, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Users,
  Inbox,
  Check,
  XCircle,
  User,
  AtSign,
  Calendar,
  Filter
} from 'lucide-react'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/contacts')
      setContacts(response.data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Failed to load contacts')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return
    
    try {
      await api.delete(`/contacts/${id}`)
      toast.success('✅ Contact deleted successfully!')
      fetchContacts()
      if (selectedContact?.id === id) setSelectedContact(null)
    } catch (error) {
      toast.error('❌ Failed to delete contact')
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/contacts/${id}`, { status })
      toast.success(`✅ Status updated to ${status}!`)
      fetchContacts()
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status })
      }
    } catch (error) {
      toast.error('❌ Failed to update status')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-700',
      read: 'bg-blue-100 text-blue-700',
      replied: 'bg-emerald-100 text-emerald-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredContacts = contacts.filter(contact => {
    if (filterStatus) return contact.status === filterStatus
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading contacts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50">
      {/* Header */}
      <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Mail className="h-8 w-8 text-blue-600" />
            Contact Messages
          </h2>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Total: {contacts.length} messages
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-5 mb-8">
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All', value: '', count: contacts.length, icon: <Inbox className="h-4 w-4" /> },
            { label: 'Pending', value: 'pending', count: contacts.filter(c => c.status === 'pending').length, icon: <Clock className="h-4 w-4" /> },
            { label: 'Read', value: 'read', count: contacts.filter(c => c.status === 'read').length, icon: <Check className="h-4 w-4" /> },
            { label: 'Replied', value: 'replied', count: contacts.filter(c => c.status === 'replied').length, icon: <CheckCircle className="h-4 w-4" /> },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                filterStatus === filter.value
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {filter.icon}
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Contact Detail View */}
      {selectedContact && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
                {selectedContact.full_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedContact.full_name}</h3>
                <p className="text-gray-500 flex items-center gap-1">
                  <AtSign className="h-4 w-4" /> {selectedContact.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedContact(null)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
              <MessageSquare className="h-4 w-4" /> Subject
            </p>
            <p className="text-slate-700">{selectedContact.subject}</p>
          </div>
          <div className="mb-6">
            <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
              <Mail className="h-4 w-4" /> Message
            </p>
            <p className="bg-slate-50 p-4 rounded-xl text-slate-700">{selectedContact.message}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleStatusUpdate(selectedContact.id, 'read')}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-md flex items-center gap-2"
            >
              <Check className="h-4 w-4" /> Mark as Read
            </button>
            <button
              onClick={() => handleStatusUpdate(selectedContact.id, 'replied')}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition shadow-md flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" /> Mark as Replied
            </button>
            <button
              onClick={() => handleDelete(selectedContact.id)}
              className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium transition shadow-md flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete Message
            </button>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 py-20 text-center">
          <div className="text-7xl mb-4 flex justify-center">
            <Inbox className="h-24 w-24 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">No messages found</h2>
          <p className="text-gray-500 mt-2">Contact messages will appear here</p>
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Subject
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Status
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-blue-50 transition duration-300">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                          {contact.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{contact.full_name}</p>
                          <p className="text-xs text-gray-400">ID #{contact.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{contact.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(contact.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white transition flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> View
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="px-4 py-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminContacts