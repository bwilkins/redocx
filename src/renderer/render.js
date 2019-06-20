import streams from 'memory-streams';
import { createElement } from '../utils/createElement';
import { WordRenderer } from './renderer';
import parse from './parse';
import { validateElement } from '../utils/renderUtils';

async function renderToMemory(element) {
  const container = createElement('ROOT');

  validateElement(element);

  const node = WordRenderer.createContainer(container);

  WordRenderer.updateContainer(element, node, null);

  const output = await parse(container).toBuffer();
  const stream = new streams.WritableStream();

  await new Promise((resolve, reject) => {
    output.doc.generate(stream);
    stream.on('finish', () => {
      resolve();
    });
    stream.on('error', () => {
      reject();
    });
  });

  return stream;
}

/**
 * This function renders the component
 * @param {Object} element
 */
async function render(element) {
  return renderToMemory(element);
}

/**
 * Required for test the components
 */
function testRenderer(element) {
  const container = createElement('ROOT');
  const node = WordRenderer.createContainer(container);

  WordRenderer.updateContainer(element, node, null);

  return container;
}

export { render, testRenderer };
