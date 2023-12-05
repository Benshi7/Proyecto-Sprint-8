import Link from 'next/link';
import billsData from './bills.json';
import BillPage from './[id]/page';
import style from './facturas.css'

function BillsPage() {
  return (
    <div className="content">
      <div className="main_content">
        <div className='Extend'>
          <h2>Facturas</h2>
          <ul>
            {billsData.map((bill) => (
              <li className="list_item" key={bill.id}>
                <Link className="link2" href="/facturas/[id]" as={`/facturas/${bill?.id}`}>
                  {bill?.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BillsPage;