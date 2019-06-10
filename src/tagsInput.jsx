import React from 'react';
import SuggestionList from './SuggestionList';
import TagList from './TagList';

class TagsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredTags: [], //その記事に登録されているタグの配列
            allTags: ['JavaScript', 'React.js', 'JS', 'Vue.js', 'PHP', 'HTML', 'CSS', 'Python', 'Laravel', 'CakePHP', 'Ruby', 'Ruby on Rails', 'WordPress'], //すでに別の記事で使用されているタグの配列
            suggestions: [], //入力中の文字の中からタグの候補をautoCompleteで出力するための配列
            newTag: '', //入力中の文字列
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e) {
        const newVal = e.target.value;
        const tmpSuggestions = [];
        this.state.allTags.forEach(function (val) {
            // もしそのタグの文字列に入力中の文字が含まれていたら候補に入れる
            if (val.toLowerCase().indexOf(newVal.toLowerCase()) !== -1) {
                tmpSuggestions.push(val);
            }
        }, this);
        this.setState({
            newTag: newVal,
            suggestions: tmpSuggestions
        });
    }

    handleKeyDown(e) {
        // タブキーが押されたら
        if (e.key === 'Tab' && e.keyCode !== 229) {
            e.preventDefault();
            let tmpRegisteredTags = this.state.registeredTags.slice();
            tmpRegisteredTags.push(this.state.newTag);

            //入力中の文字列が空ではなかったら
            if(this.state.newTag != '') {
                //そのタグがすでに選択されていなかったら新しく登録する
                if(this.state.registeredTags.indexOf(this.state.newTag) === -1) {
                    this.setState({
                        registeredTags: tmpRegisteredTags,
                        newTag: '',
                        suggestions: []
                    });
                } else {
                    alert('そのタグはすでに選択されています！')
                }
            }
        }
    }

    handleDelete(val) {
        let tmpRegisteredTags = this.state.registeredTags.slice();
        const index = tmpRegisteredTags.indexOf(val);
        tmpRegisteredTags.splice(index, 1);
        this.setState({
            registeredTags: tmpRegisteredTags
        });
    }

    render() {
        return <div>
            <input type="text" name="tag"
                   value={this.state.newTag}
                   placeholder="Tabキーで登録"
                   onChange={(e) => {this.handleChange(e)}}
                   onKeyDown={(e) => {this.handleKeyDown(e)}}
                   autoComplete="on"
                   list="suggestions" />
            <SuggestionList suggestions={this.state.suggestions} />
            <TagList registeredTags={this.state.registeredTags}
                     handleDelete={this.handleDelete} />
        </div>
    }
}

export default TagsInput;

