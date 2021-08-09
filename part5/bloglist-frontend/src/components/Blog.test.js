import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';
import { element } from 'prop-types';
import { prettyDOM } from '@testing-library/dom';
import { render, fireEvent} from '@testing-library/react'

test('renders content', () => {
  const blog = {
    title: 'Component testing',
    author: 'aWritter',
    url: 'http',
    user: 'someid',
    likes: 0,
  };

  const component = render(
    <Blog blog={ blog } />
  );

  expect(component.container).toHaveTextContent(
    'Component testing'
  );
  expect(component.container).toHaveTextContent(
    'aWritter'
  );

  //component.debug(); //print html to console Method1

  const div = component.container.querySelector('div') //print html to console Method2
  //console.log(prettyDOM(div));
});

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'Component testing',
    author: 'aWritter',
    url: 'http',
    user: 'someid',
    likes: 0,
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog}/>
  );

  const button = component.getByText('view');
  fireEvent.click(button);
  component.debug();
  expect(mockHandler.mock.calls).toHaveLength(1);
});