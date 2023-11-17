import Main from '../views/main';

const ViewManager = ({view}) => {
  switch (view) {
    case 'Experience': return <Main/>
    default: return <Main/>
  };
};

export default ViewManager;
