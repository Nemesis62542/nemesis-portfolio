import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image,
  type = 'website'
}) => {
  const location = useLocation();
  const baseUrl = window.location.origin + window.location.pathname.replace(/\/index\.html$/, '');

  // デフォルト値
  const defaultTitle = 'Nemesis Portfolio';
  const defaultDescription = 'ゲームクリエイター Nemesisのポートフォリオサイト。制作したゲーム作品やブログ記事を掲載しています。';
  const defaultImage = `${baseUrl}/assets/images/20250901/Blue_Visual.png`;

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image ? `${baseUrl}/${image.replace(/^\//, '')}` : defaultImage;
  const currentUrl = `${baseUrl}${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    // ページタイトル
    document.title = finalTitle;

    // メタタグの更新関数
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const updateNameMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // OGPタグの設定
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', finalDescription);
    updateMetaTag('og:image', finalImage);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'Nemesis Portfolio');

    // Twitter Card
    updateNameMetaTag('twitter:card', 'summary_large_image');
    updateNameMetaTag('twitter:title', finalTitle);
    updateNameMetaTag('twitter:description', finalDescription);
    updateNameMetaTag('twitter:image', finalImage);

    // 通常のメタタグ
    updateNameMetaTag('description', finalDescription);
  }, [finalTitle, finalDescription, finalImage, currentUrl, type]);

  return null; // このコンポーネントは何もレンダリングしない
};

export default MetaTags;
