import DynamicDataTable from '@/components/admin-dynamics/table/dynamic-data-table';
import ENDPOINTS from '@/utils/endpoints';
import { fetchData } from '@/utils/request-intregation';
import Link from 'next/link';
import React from 'react';

const TeamPage = async () => {
  const res = await fetchData(ENDPOINTS.TEAM);
  const team = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];

  return (
    <div className='grid gap-4'>
      <Link
        className='bg-primary text-white w-fit px-4 rounded-sm py-2'
        href='/admin/team/add'>
        Add Team Member
      </Link>
      <DynamicDataTable
        ENDPOINT={ENDPOINTS.TEAM}
        data={team}
        excludeColumns={['id', 'createdAt', 'Media']}
        title='Team Members'
        EDIT_NAME='admin/team'
      />
    </div>
  );
};

export default TeamPage;
