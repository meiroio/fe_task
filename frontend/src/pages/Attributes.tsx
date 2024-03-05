import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useIntersectionObserver } from 'usehooks-ts';
import { deleteAttribute } from '../api';
import { Input, Layout, Modal, Table } from '../components';
import { useAttributes } from '../hooks';

const Attributes = () => {
  const [attributeId, setAttributeId] = useState('');
  const { query, searchText, setSortBy, setSearchText } = useAttributes();
  const observerBottom = useIntersectionObserver({});

  const { data, isFetching, hasNextPage, fetchNextPage } = query;

  useEffect(() => {
    if (observerBottom.isIntersecting && hasNextPage) {
      !isFetching && fetchNextPage();
    }
  }, [observerBottom, hasNextPage, isFetching, fetchNextPage]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const handleCloseModal = () => {
    setAttributeId('');
  };

  const handleDelete = (id: string) => {
    toast.promise(
      deleteAttribute(id).then(() => {
        setAttributeId('');
        query.refetch();
      }),
      {
        loading: 'Deleting...',
        success: 'Attribute deleted',
        error: 'Failed to delete the attribute',
      },
    );
  };

  return (
    <Layout>
      <Input
        name="attribute"
        placeholder="Search"
        value={searchText}
        onChange={handleSearchText}
        className="w-64 py-4"
      />
      <div className="h-80 overflow-y-scroll">
        <Table
          fwdRef={observerBottom.ref}
          data={data}
          action={{ onClick: setAttributeId, label: 'Delete' }}
          isFetching={isFetching}
          setSortBy={setSortBy}
        />
      </div>
      {attributeId !== '' && (
        <Modal
          title="Are you sure?"
          onClose={handleCloseModal}
          onConfirm={() => handleDelete(attributeId)}
        >
          <p>
            {`Are you sure you want to delete attribute id=${attributeId}?`}
          </p>
        </Modal>
      )}
      <Toaster />
    </Layout>
  );
};

export default Attributes;
