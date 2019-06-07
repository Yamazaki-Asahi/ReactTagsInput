import React from 'react';

class TagsInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: [],
            allTags: ['トップス', 'ボトムス', '靴', 'バッグ', '上着', '夏服', '冬服', 'かっこいい', 'かわいい', '綺麗'],
            newTag: '',
            suggestions: [],
        }
    }

    handleChange(e) {
        const newVal = e.target.value;
        const tmpSuggestions = [];
        this.state.allTags.forEach(function (val) {
            // もしそのタグの文字列に入力中の文字が含まれていたら候補に入れる
            if (val.indexOf(newVal) !== -1) {
                tmpSuggestions.push(val);
            }
        }, this);
        this.setState({
            newTag: newVal,
            suggestions: tmpSuggestions
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Tab' && e.keyCode !== 229) {
            const array_copy = this.state.selectedTags.slice();
            array_copy.push(this.state.newTag);

            if(this.state.newTag != '') {
                if(this.state.selectedTags.indexOf(this.state.newTag)) {
                    this.setState({
                        selectedTags: array_copy,
                        newTag: ''
                    });
                } else {
                    alert('そのタグはすでに選択されています！')
                }
            }
        }
    }

    render() {
        return <div>
            <input type="text" name="tag"
                   value={this.state.newTag}
                   onChange={this.handleChange.bind(this)}
                   onKeyDown={this.handleKeyDown.bind(this)}
                   autoComplete="on"
                   list="suggestions" />
            {/*suggestions配列の中身をループ表示*/}
            <datalist id="suggestions">
                {
                    this.state.suggestions.map((data) => {
                        return <option value={data} />;
                    })
                }
            </datalist>

            {/*登録されたタグを一覧で表示*/}
            <ul className="selected-tag-list">
                {
                    this.state.selectedTags.map((data) => {
                        return <li>{data}</li>;
                     })
                }
            </ul>
        </div>
    }
}

export default TagsInput;

