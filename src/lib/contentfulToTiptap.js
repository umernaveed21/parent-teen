function convertMarks(contentfulMarks = []) {
  return contentfulMarks.map((m) => ({ type: m.type }));
}

function convertInlineNode(node, linkHref) {
  if (node.nodeType === 'text') {
    const marks = convertMarks(node.marks);
    if (linkHref) marks.push({ type: 'link', attrs: { href: linkHref } });
    return { type: 'text', text: node.value, marks: marks.length ? marks : undefined };
  }
  if (node.nodeType === 'hyperlink') {
    return (node.content || []).map((child) => convertInlineNode(child, node.data?.uri));
  }
  return null;
}

function convertInlineArray(nodes = []) {
  return nodes.flatMap((n) => {
    const result = convertInlineNode(n);
    return Array.isArray(result) ? result : [result];
  }).filter(Boolean);
}

function convertBlockNode(node) {
  switch (node.nodeType) {
    case 'paragraph':
      return { type: 'paragraph', content: convertInlineArray(node.content) };
    case 'heading-2':
      return { type: 'heading', attrs: { level: 2 }, content: convertInlineArray(node.content) };
    case 'heading-3':
      return { type: 'heading', attrs: { level: 3 }, content: convertInlineArray(node.content) };
    case 'unordered-list':
      return { type: 'bulletList', content: (node.content || []).map(convertBlockNode) };
    case 'ordered-list':
      return { type: 'orderedList', content: (node.content || []).map(convertBlockNode) };
    case 'list-item':
      return { type: 'listItem', content: (node.content || []).map(convertBlockNode) };
    case 'blockquote':
      return { type: 'blockquote', content: (node.content || []).map(convertBlockNode) };
    default:
      return null;
  }
}

export function contentfulRichTextToTiptap(contentfulDoc) {
  if (!contentfulDoc || !contentfulDoc.content) {
    return { type: 'doc', content: [{ type: 'paragraph' }] };
  }

  const content = contentfulDoc.content.map(convertBlockNode).filter(Boolean);

  return {
    type: 'doc',
    content: content.length ? content : [{ type: 'paragraph' }],
  };
}