import React from 'react';

class TagList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const suggestionsListHtml = [];

        this.props.suggestions.forEach((val) => {
            suggestionsListHtml.push(<option value={val} />);
        }, this);

        return <datalist id="suggestions">{suggestionsListHtml}</datalist>
    }
}

export default TagList;

