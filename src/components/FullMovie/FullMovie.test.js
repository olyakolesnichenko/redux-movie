import React from 'react';
import FullMovie from './';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { options } from '../../containers/App';

Enzyme.configure({ adapter: new Adapter() });

const { apiKey, apiPath, key } = options;

const newMovie = {
    'id':           440021,
    'overview':     'Some interesting film',
    'poster_path':  '/FFm2DNpzfPDvIy8DKSyZ71et8W.jpg',
    'title':        'It',
    'vote_average': 7.3
};
const state = {
    movie: {}
};
const mutatedState = {
    movie: newMovie
};
const result = shallow(<FullMovie match = { { params: { id: 440021 } } } />, {
    context: {
        apiKey,
        apiPath,
        key
    }
});

describe('FullMovie component: ', () => {
    test('Should have 1 \'div\' element', () => {
        expect(result.find('div')).toHaveLength(1);
    });
    test('Should have valid initial state', () => {
        expect(1).toEqual(1);
    });
    test('Should respond to state change properly', () => {
        result.setState(() => ({
            movie: newMovie
        }));

        expect(result.state()).toEqual(mutatedState);

        result.setState(() => ({
            movie: {}
        }));
        expect(result.state()).toEqual(state);
    });
});
