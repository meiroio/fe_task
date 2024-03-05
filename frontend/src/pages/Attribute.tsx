import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Layout, Modal } from '../components';
import { useAttribute, useLabels } from '../hooks';
import { deleteAttribute } from '../api';
import { MISSING_TEXT } from '../constants';

const Attribute = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isFetching } = useAttribute();
  const { data: labels } = useLabels();

  if (isFetching) {
    return <Layout>Loading...</Layout>;
  }

  if (!data) {
    return (
      <Layout>
        <div className="flex w-full flex-col items-center justify-center pt-8">
          <h1 className="text-3xl font-bold">404 - Attribute not found</h1>
          <Link to="/attributes" className="btn-muted mt-8">
            Back
          </Link>
        </div>
      </Layout>
    );
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (id: string) => {
    toast.promise(
      deleteAttribute(id).then(() => {
        queryClient.invalidateQueries({ queryKey: ['attributes'] });
        queryClient.invalidateQueries({ queryKey: ['attribute', data.id] });
        navigate('/attributes');
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
      <div className="flex w-full flex-col items-center justify-center pt-8">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <div className="pt-4">
          {data.labelIds.map((id) => labels?.[id] ?? MISSING_TEXT).join(', ')}
        </div>
        <div className="flex gap-2 pt-8">
          <Link to="/attributes" className="btn-muted">
            Back
          </Link>
          <button className="btn-danger" onClick={toggleModal}>
            Delete
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal
          title="Are you sure?"
          onClose={toggleModal}
          onConfirm={() => handleDelete(data.id)}
        >
          <p>{`Are you sure you want to delete attribute id=${data.id}?`}</p>
        </Modal>
      )}
      <Toaster />
    </Layout>
  );
};

export default Attribute;
