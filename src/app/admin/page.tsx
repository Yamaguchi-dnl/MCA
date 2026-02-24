import type { Registration } from "@/types";
import { AdminHeader } from "@/components/admin/admin-header";
import { DashboardClient } from "@/components/admin/dashboard-client";

// In a real application, you would fetch this data from Firestore.
// For example:
// import { db } from "@/lib/firebase";
// import { collection, getDocs, orderBy } from "firebase/firestore";
//
// async function getRegistrations(): Promise<Registration[]> {
//   const querySnapshot = await getDocs(collection(db, "inscricoes"), orderBy("submissionDate", "desc"));
//   return querySnapshot.docs.map(doc => {
//     const data = doc.data();
//     return {
//       id: doc.id,
//       ...data,
//       birthDate: data.birthDate.toDate(),
//       submissionDate: data.submissionDate.toDate(),
//     } as Registration;
//   });
// }

async function getMockRegistrations(): Promise<Registration[]> {
  // Mock data to simulate registrations from Firestore
  return [
    { id: '1', childName: 'João Silva', birthDate: new Date('2015-05-20'), ageGroup: '1º ao 5º ano (6-10 anos)', guardianName: 'Maria Silva', guardianWhatsapp: '(11) 98765-4321', hasDietaryRestriction: 'sim', dietaryRestrictionDetails: 'Alergia a amendoim.', consentInfo: true, consentSupervision: true, status: 'confirmado', submissionDate: new Date() },
    { id: '2', childName: 'Ana Pereira', birthDate: new Date('2018-02-10'), ageGroup: 'Jardim (4-5 anos)', guardianName: 'Carlos Pereira', guardianWhatsapp: '(21) 91234-5678', hasDietaryRestriction: 'nao', dietaryRestrictionDetails: '', consentInfo: true, consentSupervision: true, status: 'confirmado', submissionDate: new Date() },
    { id: '3', childName: 'Lucas Oliveira', birthDate: new Date('2012-11-30'), ageGroup: '6º ao 9º ano (11-14 anos)', guardianName: 'Fernanda Oliveira', guardianWhatsapp: '(31) 99999-8888', hasDietaryRestriction: 'sim', dietaryRestrictionDetails: 'Intolerância à lactose.', consentInfo: true, consentSupervision: true, status: 'confirmado', submissionDate: new Date() },
    { id: '4', childName: 'Sofia Costa', birthDate: new Date('2021-08-15'), ageGroup: 'Maternal (2-3 anos)', guardianName: 'Ricardo Costa', guardianWhatsapp: '(41) 98877-6655', hasDietaryRestriction: 'nao', dietaryRestrictionDetails: '', consentInfo: true, consentSupervision: true, status: 'confirmado', submissionDate: new Date() },
    { id: '5', childName: 'Gabriel Martins', birthDate: new Date('2007-01-25'), ageGroup: 'Ensino Médio (15-17 anos)', guardianName: 'Juliana Martins', guardianWhatsapp: '(51) 98123-9876', hasDietaryRestriction: 'nao', dietaryRestrictionDetails: '', consentInfo: true, consentSupervision: true, status: 'confirmado', submissionDate: new Date() },
  ];
}


export default async function AdminPage() {
  // const registrations = await getRegistrations();
  const registrations = await getMockRegistrations();

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <DashboardClient registrations={registrations} />
      </main>
    </>
  );
}
