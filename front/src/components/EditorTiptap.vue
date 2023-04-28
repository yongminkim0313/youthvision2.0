<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
                <button class="button" :class="{ 'is-active': isActive.italic() }" @click.prevent="commands.italic">
                    <v-icon>mdi-format-italic</v-icon>
                </button>
                <button class="button" :class="{ 'is-active': isActive.strike() }" @click.prevent="commands.strike">
                    <v-icon>mdi-format-strikethrough-variant</v-icon>
                </button>
                <button class="button" :class="{ 'is-active': isActive.underline() }" @click.prevent="commands.underline">
                    <v-icon>mdi-format-underline</v-icon>
                </button>
                <!-- <button class="button" :class="{ 'is-active': isActive.code() }" @click.prevent="commands.code">
                    code
                </button>
                <button class="button" :class="{ 'is-active': isActive.code_block() }" @click.prevent="commands.code_block">
                    file-code
                </button> -->
                <button class="button" :class="{ 'is-active': isActive.paragraph() }" @click.prevent="commands.paragraph">
                    <v-icon>mdi-format-paragraph</v-icon>
                </button>
                <button class="button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                    <v-icon>mdi-format-bold</v-icon>
                </button>
                <button class="button" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click.prevent="commands.heading({ level: 1 })">
                    H1
                </button>
                <button class="button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click.prevent="commands.heading({ level: 2 })">
                    H2
                </button>
                <button class="button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click.prevent="commands.heading({ level: 3 })">
                    H3
                </button>
                <button class="button" :class="{ 'is-active': isActive.bullet_list() }" @click.prevent="commands.bullet_list">
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </button>
                <button class="button" :class="{ 'is-active': isActive.ordered_list() }" @click.prevent="commands.ordered_list">
                    <v-icon>mdi-format-list-numbered</v-icon>
                </button>
                <button class="button" :class="{ 'is-active': isActive.blockquote() }" @click.prevent="commands.blockquote">
                    <v-icon>mdi-format-quote-open</v-icon>
                </button>
                <button class="button" @click.prevent="commands.horizontal_rule">
                    <v-icon>mdi-minus</v-icon>
                </button>
                <button class="button" @click.prevent="commands.undo">
                    <v-icon>mdi-undo</v-icon>
                </button>
                <button class="button" @click.prevent="commands.redo">
                    <v-icon>mdi-redo</v-icon>
                </button>
            </div>
        </editor-menu-bar>
        <editor-content class="content" :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { Blockquote, CodeBlock, HardBreak, Heading, HorizontalRule, OrderedList, BulletList, ListItem, TodoItem, TodoList, Bold, Code, Italic, Link, Strike, Underline, History } from "tiptap-extensions";
export default {
    name:'EditorTiptap',
    components: {
        EditorContent,
        EditorMenuBar,
    },
    props: ["description", "menubar", "readOnly"],
    data() {
        return {
            swMenubar: true,
            linkUrl: null,
            linkMenuIsActive: false,
            editor: null,
        };
    },
    watch:{
        description: function(val){
            this.editor.setContent(val)
        }
    },
    mounted() {
        this.editor = new Editor({
            editable: !this.readOnly,
            extensions: [new Blockquote(), new BulletList(), new CodeBlock(), new HardBreak(), new Heading({ levels: [1, 2, 3] }), new Link({ rel: "", target: "_blank" }), new HorizontalRule(), new ListItem(), new OrderedList(), new TodoItem(), new TodoList(), new Bold(), new Code(), new Italic(), new Strike(), new Underline(), new History()],
            content: this.description,
            onUpdate: ({ getHTML }) => {
                this.$emit("editorContent", getHTML());
            },
            onInit:(options)=>{
                options.view.dom.style.minHeight = '10em';
            }
        });
    },

    beforeDestroy() {
        this.editor.destroy();
    },

    methods: {
        showLinkMenu(attrs) {
            this.linkUrl = attrs.href;
            this.linkMenuIsActive = true;
            this.$nextTick(() => {
                this.$refs.linkInput.focus();
            });
        },

        hideLinkMenu() {
            this.linkUrl = null;
            this.linkMenuIsActive = false;
        },

        setLinkUrl(command, url) {
            command({ href: url, target: "_blank" });
            this.hideLinkMenu();
        },
    },
};
</script>
<style scoped>
 .menubar {
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 0.2rem 0;
    transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
 }

.span_button {
    font-size: 13.3333px;
}
.editor {
    position: relative;
    margin: 0 auto 10px auto;
}
.content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
}

p code {
    padding: 0.2rem 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(black, 0.1);
    color: rgba(black, 0.8);
}

ul, ol {
    padding-left: 1rem;
}

li > p, li > ol, li > ul {
    margin: 0;
}

a:not(.btn) {
    color: black;
    text-decoration: underline;
}
blockquote {
    border-left: 3px solid rgba(black, 0.1);
    color: rgba(black, 0.8);
    padding-left: 0.8rem;
    font-style: italic;
}

img {
    max-width: 100%;
    border-radius: 3px;
}

table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
}

table > td, table> th {
    min-width: 1em;
    border: 2px solid gray;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
}

table > th {
    font-weight: bold;
    text-align: left;
}

.selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
}

.column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
}

.tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
}

.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
}
.v-application p {
    margin-bottom: 0px !important;
}
</style>