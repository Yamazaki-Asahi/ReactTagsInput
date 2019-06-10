import React from 'react';

class TagList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const registeredTagsListHtml = [];

        this.props.registeredTags.forEach((val) => {
            registeredTagsListHtml.push(<li>{val} <a href="javascript:void(0)" onClick={() => {this.props.handleDelete(val)}}>×</a></li>);
        }, this);

        return <ul className="selected-tag-list">
            {registeredTagsListHtml}
        </ul>
    }
}

export default TagList;

