function convertMarks(tiptapMarks = []) {
  return tiptapMarks
    .filter((m) => m.type !== 'link') // link is handled separately, not as a mark
    .map((m) => ({ type: m.type })); // bold, italic map directly — same names in both systems
}

function convertInline(node) {
  if (node.type === 'text') {
    const linkMark = node.marks?.find((m) => m.type === 'link');
    const textNode = {
      nodeType: 'text',
      value: node.text || '',
      marks: convertMarks(node.marks),
      data: {},
    };

    if (linkMark) {
      return {
        nodeType: 'hyperlink',
        data: { uri: linkMark.attrs.href },
        content: [{ ...textNode, marks: convertMarks(node.marks) }],
      };
    }
    return textNode;
  }
  return null;
}

function convertBlock(node) {
  switch (node.type) {
    case 'paragraph':
      return {
        nodeType: 'paragraph',
        data: {},
        content: (node.content || []).map(convertInline).filter(Boolean),
      };
    case 'heading':
      return {
        nodeType: `heading-${node.attrs.level}`,
        data: {},
        content: (node.content || []).map(convertInline).filter(Boolean),
      };
    case 'bulletList':
      return {
        nodeType: 'unordered-list',
        data: {},
        content: (node.content || []).map(convertBlock),
      };
    case 'orderedList':
      return {
        nodeType: 'ordered-list',
        data: {},
        content: (node.content || []).map(convertBlock),
      };
    case 'listItem':
      return {
        nodeType: 'list-item',
        data: {},
        content: (node.content || []).map(convertBlock),
      };
    case 'blockquote':
      return {
        nodeType: 'blockquote',
        data: {},
        content: (node.content || []).map(convertBlock),
      };
    default:
      return null;
  }
}

export function tiptapToContentfulRichText(tiptapJSON) {
  return {
    nodeType: 'document',
    data: {},
    content: (tiptapJSON.content || []).map(convertBlock).filter(Boolean),
  };
}