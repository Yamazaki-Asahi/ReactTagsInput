import React from 'react';

class TagsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredTags: [], //その記事に登録されているタグの配列
            allTags: ['JavaScript', 'React', 'JS', 'Vue.js', 'PHP', 'HTML', 'CSS', 'Python', 'Laravel', 'CakePHP', 'Ruby', 'Ruby on Rails', 'WordPress'], //すでに別の記事で使用されているタグの配列
            suggestions: [], //入力中の文字の中からタグの候補をautoCompleteで出力するための配列
            newTag: '', //入力中の文字列
        }
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
        console.log('aaa');
        let tmpRegisteredTags = this.state.registeredTags.slice();
        const index = tmpRegisteredTags.indexOf(val);
        tmpRegisteredTags.splice(index, 1);
        // console.log(index, tmpRegisteredTags);
        this.setState({
            registeredTags: tmpRegisteredTags
        });
    }

    render() {
        const registeredTagsListHtml = [];
        const suggestionsListHtml = [];

        this.state.suggestions.forEach((val) => {
            suggestionsListHtml.push(<option value={val} />);
        }, this)

        this.state.registeredTags.forEach((val) => {
            registeredTagsListHtml.push(<li>{val} <a href="javascript:void(0)" onClick={() => {this.handleDelete(val)}}>×</a></li>);
        }, this);

        return <div>

            <input type="text" name="tag"
                   value={this.state.newTag}
                   placeholder="Tabキーで登録"
                   onChange={(e) => {this.handleChange(e)}}
                   onKeyDown={(e) => {this.handleKeyDown(e)}}
                   autoComplete="on"
                   list="suggestions" />
            {/*suggestions配列の中身をループ表示*/}
            <datalist id="suggestions">{suggestionsListHtml}</datalist>
            {/*登録されたタグを一覧で表示*/}
            <ul className="selected-tag-list">{registeredTagsListHtml}</ul>
        </div>
    }
}

export default TagsInput;

