import React, { useState, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IframeDrawer from './IframeDrawer';
import { mockEmperia } from '../../utils/mocks/data';

global.window.emperia = {
  ...mockEmperia,
  data: {
    ...mockEmperia.data,
    ui: {
      ...mockEmperia.data.ui,
      iframeModels: [
        {
          id: 'testIframe',
          iFrameModel: {
            url: {
              type: 'url',
              name: 'Test Iframe',
              value: 'https://example.com',
            },
          },
        },
      ],
    },
  },
};
const TestComponent = () => {
  const [iframeData, setIframeData] = useState<{ active: boolean; url: string }>({
    active: false,
    url: '',
  });

  useEffect(() => {
    const handleCustomEvent = (event: CustomEvent) => {
      if (event.detail.name === 'OpenIframe') {
        const data = window.emperia?.data.ui.iframeModels.find((i) => i.id == event.detail.data)?.iFrameModel;
        if (!data) {
          return;
        }
        setIframeData({
          active: true,
          url: `https://example.com/${event.detail.data}`,
        });
      }
    };

    window.addEventListener('fromExperience', handleCustomEvent as EventListener);
    return () => {
      window.removeEventListener('fromExperience', handleCustomEvent as EventListener);
    };
  }, []);

  return (
    <IframeDrawer
      iframeId="testIframe"
      active={iframeData.active}
      url={iframeData.url}
      onClose={() =>
        setIframeData({
          active: false,
          url: '',
        })
      }
    />
  );
};

describe('IframeDrawer with CustomEvent', () => {
  it('opens the modal and sets the iframe URL when the custom event is dispatched', async () => {
    render(<TestComponent />);

    // Dispatch the custom event
    window.dispatchEvent(
      new CustomEvent('fromExperience', {
        detail: {
          name: 'OpenIframe',
          data: 'testIframe',
        },
      }),
    );

    // Wait for the iframe to appear in the DOM
    await waitFor(async () => {
      const iframeElement = await screen.findByTestId('iframe-test');
      expect(iframeElement).toBeInTheDocument();
      expect(iframeElement).toHaveAttribute('src', 'https://example.com/testIframe');
    });
  });
  it('Does not sets the iframe URL when the custom event is dispatched', async () => {
    render(<TestComponent />);

    // Dispatch the custom event
    window.dispatchEvent(
      new CustomEvent('fromExperience', {
        detail: {
          name: 'OpenIframe',
          data: '',
        },
      }),
    );

    // Wait for the iframe to appear in the DOM
    const iframeElement = screen.queryByTitle('testIframe');
    expect(iframeElement).not.toBeInTheDocument();
  });
});
describe('IframeDrawer Component', () => {
  const defaultProps = {
    iframeId: 'testIframe',
    active: true,
    url: 'https://example.com',
    onClose: jest.fn(),
  };

  it('renders the modal when active is true', () => {
    render(<IframeDrawer {...defaultProps} />);
    const iframeElement = screen.getByTitle('testIframe');
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute('src', 'https://example.com');
  });

  it('does not render the modal when active is false', () => {
    render(<IframeDrawer {...defaultProps} active={false} />);
    const iframeElement = screen.queryByTitle('testIframe');
    expect(iframeElement).not.toBeInTheDocument();
  });
});
