import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  'site_name': {
    en: "Santal Engineering Students' Welfare Association (W.B.)",
    ol: "ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱥᱴᱩᱰᱮᱱᱴᱥ ᱳᱭᱮᱞᱯᱷᱮᱭᱟᱨ ᱮᱥᱳᱥᱤᱭᱮᱥᱮᱱ (ᱯ.ᱵ.)"
  },
  'home': { en: 'Home', ol: 'ᱳᱲᱟᱜ' },
  'about': { en: 'About SESWA', ol: 'SESWA ᱵᱟᱵᱚᱛ' },
  'aims': { en: 'Aims & Objectives', ol: 'ᱡᱚᱥ ᱟᱨ ᱩᱫᱽᱫᱮᱥ' },
  'events': { en: 'Events', ol: 'ᱜᱷᱚᱴᱚᱱ' },
  'notice_board': { en: 'Notice Board', ol: 'ᱱᱳᱴᱤᱥ ᱵᱳᱨᱰ' },
  'members': { en: 'Governing Members', ol: 'ᱥᱚᱦᱮᱫ ᱠᱚ' },
  'achievements': { en: 'Achievements', ol: 'ᱡᱤᱛᱠᱟᱹᱨ' },
  'gallery': { en: 'Gallery', ol: 'ᱜᱮᱞᱮᱨᱤ' },
  'contact': { en: 'Contact', ol: 'ᱥᱟᱹᱜᱟᱹᱭ' },
  'login': { en: 'Login', ol: 'ᱞᱚᱜᱤᱱ' },
  'vision': { en: 'Our Vision', ol: 'ᱟᱵᱚᱣᱟᱜ ᱡᱚᱥ' },
  'mission': { en: 'Our Mission', ol: 'ᱟᱵᱚᱣᱟᱜ ᱢᱤᱥᱚᱱ' },
  'rank': { en: 'Rank', ol: 'ᱨᱮᱸᱠ' },
  'student_name': { en: 'Student Name', ol: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱧᱩᱛᱩᱢ' },
  'exam': { en: 'Exam', ol: 'ᱵᱤᱱᱤᱰ' },
  'year': { en: 'Year', ol: 'ᱥᱮᱨᱢᱟ' },
  'description': { en: 'Description', ol: 'ᱵᱤᱵᱚᱨᱚᱱ' },
  'no_notices': { en: 'No notices available.', ol: 'ᱱᱳᱴᱤᱥ ᱵᱟᱹᱱᱩᱜᱼᱟ ᱾' },
  'no_achievements': { en: 'No achievements recorded yet.', ol: 'ᱡᱤᱛᱠᱟᱹᱨ ᱨᱮᱠᱚᱨᱰ ᱵᱟᱹᱱᱩᱜᱼᱟ ᱾' },
  'view_all_members': { en: 'View All Governing Members', ol: 'ᱡᱚᱛᱚ ᱥᱚᱦᱮᱫ ᱠᱚ ᱧᱮᱞ' },
  'quick_links': { en: 'Quick Links', ol: 'ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱞᱤᱸᱠ' },
  'designed_by': { en: 'Designed and Maintained by SESWA IT Cell.', ol: 'SESWA IT Cell ᱦᱚᱛᱮᱛᱮ ᱵᱮᱱᱟᱣ ᱟᱨ ᱡᱚᱜᱟᱣ ᱾' },
  'home_us': { en: 'Home', ol: 'ᱳᱲᱟᱜ' },
  'about_us': { en: 'About Us', ol: 'ᱟᱞᱮ ᱵᱟᱵᱚᱛ' },
  'address_label': { en: 'Address', ol: 'ᱴᱷᱟᱶ' },
  'email_label': { en: 'Email', ol: 'ᱤᱢᱮᱞ' },
  'address_text': { en: 'Nityananda Nagar, D.S.Lane, Howrah, Kolkata, India, PIN: 711 109', ol: 'ᱱᱤᱛᱭᱟᱱᱚᱱᱫᱚ ᱱᱚᱜᱚᱨ, ᱰᱤ.ᱮᱥ. ᱞᱮᱱ, ᱦᱟᱣᱲᱟ, ᱠᱚᱞᱠᱟᱛᱟ, ᱥᱤᱧᱚᱛ, ᱯᱤᱱ: ᱗᱑᱑ ᱑᱐᱙' },
  'contact_intro': { en: 'We are here to help and support you. If you have any questions, suggestions, or would like to join our association, please feel free to reach out to us using the contact details below or by filling out the form.', ol: 'ᱟᱞᱮ ᱟᱯᱮᱭᱟᱜ ᱜᱚᱲᱚ ᱞᱟᱹᱜᱤᱫ ᱢᱮᱱᱟᱜ ᱞᱮᱭᱟ ᱾ ᱡᱩᱫᱤ ᱡᱟᱦᱟᱸᱱᱟᱜ ᱠᱩᱠᱞᱤ, ᱥᱟᱹᱦᱤ ᱟᱨᱵᱟᱝ ᱟᱞᱮᱭᱟᱜ ᱜᱟᱶᱛᱟ ᱨᱮ ᱥᱮᱞᱮᱫᱚᱜ ᱥᱟᱱᱟᱭᱮᱫ ᱯᱮᱭᱟ, ᱮᱱᱠᱷᱟᱱ ᱞᱟᱛᱟᱨ ᱨᱮ ᱮᱢ ᱟᱠᱟᱱ ᱥᱟᱹᱜᱟᱹᱭ ᱛᱮ ᱟᱨᱵᱟᱝ ᱯᱷᱚᱨᱢ ᱯᱮᱨᱮᱡ ᱠᱟᱛᱮ ᱞᱮ ᱵᱟᱰᱟᱭ ᱦᱚᱪᱚ ᱞᱮᱯᱮ ᱾' },
  'send_message': { en: 'Send us a Message', ol: 'ᱢᱤᱫᱴᱟᱝ ᱠᱷᱚᱵᱚᱨ ᱵᱷᱮᱡᱟᱭ ᱢᱮ' },
  'full_name': { en: 'Full Name', ol: 'ᱯᱩᱨᱟᱹ ᱧᱩᱛᱩᱢ' },
  'email_address': { en: 'Email Address', ol: 'ᱤᱢᱮᱞ ᱴᱷᱟᱶ' },
  'subject': { en: 'Subject', ol: 'ᱥᱟᱛᱟᱢ' },
  'message': { en: 'Message', ol: 'ᱠᱷᱚᱵᱚᱨ' },
  'placeholder_name': { en: 'Enter your name', ol: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱢᱮ' },
  'placeholder_email': { en: 'Enter your email', ol: 'ᱟᱢᱟᱜ ᱤᱢᱮᱞ ᱚᱞ ᱢᱮ' },
  'placeholder_subject': { en: 'Enter subject', ol: 'ᱥᱟᱛᱟᱢ ᱚᱞ ᱢᱮ' },
  'placeholder_message': { en: 'Enter your message', ol: 'ᱟᱢᱟᱜ ᱠᱷᱚᱵᱚᱨ ᱚᱞ ᱢᱮ' },
  'send_btn': { en: 'Send Message', ol: 'ᱠᱷᱚᱵᱚᱨ ᱵᱷᱮᱡᱟᱭ ᱢᱮ' },
  'msg_success': { en: 'Message Sent Successfully!', ol: 'ᱠᱷᱚᱵᱚᱨ ᱱᱟᱯᱟᱭ ᱛᱮ ᱵᱷᱮᱡᱟ ᱟᱠᱟᱱᱟ!' },
  'msg_thanks': { en: 'Thank you for reaching out. We will get back to you soon.', ol: 'ᱥᱟᱹᱜᱟᱹᱭ ᱡᱚᱲᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱨᱦᱟᱣ ᱾ ᱟᱞᱮ ᱞᱚᱜᱚᱱ ᱜᱮ ᱟᱢ ᱥᱟᱶ ᱞᱮ ᱡᱚᱲᱟᱣᱚᱜᱼᱟ ᱾' },
  'send_another': { en: 'Send another message', ol: 'ᱟᱨ ᱢᱤᱫᱴᱟᱝ ᱠᱷᱚᱵᱚᱨ ᱵᱷᱮᱡᱟᱭ ᱢᱮ' },
  'all_cat': { en: 'All', ol: 'ᱡᱚᱛᱚ' },
  'events_cat': { en: 'Events', ol: 'ᱜᱷᱚᱴᱚᱱ' },
  'awards_cat': { en: 'Awards', ol: 'ᱥᱤᱨᱯᱷᱟᱹ' },
  'community_cat': { en: 'Community Activities', ol: 'ᱥᱟᱶᱛᱟ ᱟᱹᱨᱤ ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ' },
  'no_images': { en: 'No images found in this category.', ol: 'ᱱᱚᱣᱟ ᱛᱷᱚᱠ ᱨᱮ ᱪᱮᱫ ᱪᱤᱛᱟᱹᱨ ᱦᱚᱸ ᱵᱟᱹᱱᱩᱜᱼᱟ ᱾' },
  'events_desc': { en: 'Explore our annual picnic, freshers welcome, and other community events.', ol: 'ᱟᱞᱮᱭᱟᱜ ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱯᱤᱠᱱᱤᱠ, ᱱᱟᱣᱟ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱟᱛᱟᱝ ᱫᱟᱨᱟᱢ ᱟᱨ ᱮᱴᱟᱜ ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ ᱠᱚ ᱧᱮᱞ ᱢᱮ ᱾' },
  'achievements_desc': { en: 'Celebrating the success of our students in WBJEE, IITJEE, and AIEEE.', ol: 'WBJEE, IITJEE, ᱟᱨ AIEEE ᱨᱮ ᱟᱵᱚ ᱨᱮᱱ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱡᱤᱛᱠᱟᱹᱨ ᱢᱟᱱᱟᱣ ᱾' },
  'aims_desc': { en: 'Our 12 core objectives focused on welfare and cultural preservation.', ol: 'ᱟᱵᱚᱣᱟᱜ ᱑᱒ ᱜᱚᱴᱟᱝ ᱢᱩᱞ ᱡᱚᱥ ᱡᱟᱦᱟᱸ ᱫᱚ ᱵᱷᱟᱹᱞᱟᱹᱭ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱡᱚᱜᱟᱣ ᱨᱮ ᱢᱮᱱᱟᱜᱼᱟ ᱾' },
  'gallery_desc': { en: 'Visual journey of our association\'s activities and community impact.', ol: 'ᱟᱵᱚᱣᱟᱜ ᱜᱟᱶᱛᱟ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ ᱟᱨ ᱥᱟᱶᱛᱟ ᱨᱮ ᱚᱨᱥᱚᱝ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱾' },
  'about_p1': {
    en: "The Santal Engineering Students' Welfare Association (W.B.), commonly known as SESWA, is a premier non-profit organization dedicated to the upliftment and welfare of Santal engineering students across West Bengal. Established in 2003, the association has been a beacon of hope, unity, and cultural pride for over two decades.",
    ol: "ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱥᱴᱩᱰᱮᱱᱴᱥ ᱳᱭᱮᱞᱯᱷᱮᱭᱟᱨ ᱮᱥᱳᱥᱤᱭᱮᱥᱮᱱ (ᱯ.ᱵ.), ᱡᱟᱦᱟᱸ ᱫᱚ SESWA ᱢᱮᱱᱛᱮ ᱵᱟᱰᱟᱭᱚᱜᱼᱟ, ᱯᱩᱪᱷᱤᱢ ᱵᱟᱝᱞᱟ ᱨᱮᱱ ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱞᱟᱦᱟᱱᱛᱤ ᱟᱨ ᱵᱷᱟᱹᱞᱟᱹᱭ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱵᱮᱼᱞᱟᱵᱷ ᱜᱟᱶᱛᱟ ᱠᱟᱱᱟ ᱾ ᱒᱐᱐᱓ ᱥᱮᱨᱢᱟ ᱨᱮ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱱ ᱱᱚᱣᱟ ᱜᱟᱶᱛᱟ ᱫᱚ ᱵᱟᱨ ᱜᱮᱞ ᱥᱮᱨᱢᱟ ᱠᱷᱚᱱ ᱟᱥᱟ, ᱡᱩᱢᱤᱫᱽ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱨᱮᱱᱟᱜ ᱢᱟᱱᱚᱛ ᱮᱢ ᱟᱹᱜᱩᱭᱮᱫᱟ ᱾"
  },
  'about_p2': {
    en: "Our journey began with a small group of visionary engineering students who recognized the unique challenges faced by tribal students in technical education. They envisioned a platform where students could support each other academically, financially, and emotionally while staying rooted in their rich Santal heritage.",
    ol: "ᱟᱵᱚᱣᱟᱜ ᱱᱚᱣᱟ ᱰᱟᱦᱟᱨ ᱫᱚ ᱠᱤᱪᱷᱩ ᱥᱮᱪᱮᱫ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱦᱚᱛᱮᱛᱮ ᱮᱛᱚᱦᱚᱵ ᱞᱮᱱᱟ, ᱡᱟᱦᱟᱸᱭ ᱫᱚ ᱴᱮᱠᱱᱤᱠᱮᱞ ᱥᱮᱪᱮᱫ ᱨᱮ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱵᱟᱰᱟᱭ ᱧᱟᱢ ᱞᱮᱫᱟ ᱾ ᱩᱱᱠᱩ ᱢᱤᱫ ᱱᱚᱝᱠᱟᱱ ᱴᱷᱟᱶ ᱠᱚ ᱧᱮᱞ ᱞᱮᱫᱟ ᱡᱟᱦᱟᱸ ᱨᱮ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱯᱟᱲᱦᱟᱣ, ᱠᱟᱹᱣᱰᱤ ᱟᱨ ᱢᱚᱱᱮ ᱨᱮᱱᱟᱜ ᱜᱚᱲᱚ ᱠᱚ ᱮᱢ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ ᱟᱨ ᱟᱯᱱᱟᱨᱟᱜ ᱥᱟᱱᱛᱟᱞ ᱞᱟᱠᱪᱟᱨ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ ᱾"
  },
  'about_quote': {
    en: '"To empower Santal engineering students through unity, academic excellence, and cultural preservation, ensuring they become leaders who contribute meaningfully to society while honoring their roots."',
    ol: '"ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱡᱩᱢᱤᱫᱽ, ᱥᱮᱪᱮᱫ ᱡᱤᱛᱠᱟᱹᱨ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱡᱚᱜᱟᱣ ᱛᱟᱞᱟᱛᱮ ᱫᱟᱲᱮᱭᱟᱱ ᱵᱮᱱᱟᱣ, ᱡᱟᱦᱟᱸ ᱛᱮ ᱩᱱᱠᱩ ᱥᱟᱶᱛᱟ ᱨᱮ ᱢᱟᱨᱟᱝ ᱟᱹᱭᱩᱨᱤᱭᱟᱹ ᱠᱚ ᱵᱮᱱᱟᱣ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ ᱾"'
  },
  'about_p3': {
    en: "Over the years, SESWA has grown into a robust network connecting students from various engineering colleges, universities, and professional institutes. We organize annual events like the Annual Picnic and Freshers Welcome, which serve as vital platforms for networking, mentorship, and cultural expression.",
    ol: "ᱥᱮᱨᱢᱟ ᱥᱮᱨᱢᱟ ᱛᱮ, SESWA ᱫᱚ ᱵᱷᱮᱜᱟᱨ ᱵᱷᱮᱜᱟᱨ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱠᱚᱞᱮᱡᱽ, ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱟᱨ ᱯᱨᱳᱯᱷᱮᱥᱚᱱᱟᱞ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱨᱮᱱ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱟᱶ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱱᱮᱴᱣᱟᱨᱠ ᱮ ᱵᱮᱱᱟᱣ ᱟᱠᱟᱫᱟ ᱾ ᱟᱞᱮ ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱯᱤᱠᱱᱤᱠ ᱟᱨ ᱱᱟᱣᱟ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱟᱛᱟᱝ ᱫᱟᱨᱟᱢ ᱞᱮᱠᱟᱱ ᱠᱟᱹᱢᱤ ᱦᱚᱨᱟ ᱞᱮ ᱥᱟᱯᱲᱟᱣᱟ, ᱡᱟᱦᱟᱸ ᱫᱚ ᱱᱮᱴᱣᱟᱨᱠᱤᱝ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱩᱫᱩᱜ ᱞᱟᱹᱜᱤᱫ ᱟᱹᱰᱤ ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱠᱟᱱᱟ ᱾"
  },
  'about_p4': {
    en: "Beyond social gatherings, SESWA is deeply committed to academic success. We recognize and reward top performers in prestigious entrance exams like WBJEE, IITJEE, and AIEEE, inspiring the next generation to aim higher. Our members actively participate in community service, awareness programs, and advocacy for tribal rights in education.",
    ol: "ᱥᱟᱶᱛᱟ ᱟᱹᱨᱤ ᱡᱟᱣᱨᱟ ᱵᱮᱜᱚᱨ ᱦᱚᱸ, SESWA ᱫᱚ ᱥᱮᱪᱮᱫ ᱡᱤᱛᱠᱟᱹᱨ ᱞᱟᱹᱜᱤᱫ ᱟᱹᱰᱤ ᱠᱟᱹᱢᱤᱭᱟ ᱾ ᱟᱞᱮ WBJEE, IITJEE, ᱟᱨ AIEEE ᱞᱮᱠᱟᱱ ᱵᱤᱱᱤᱰ ᱨᱮ ᱡᱤᱛᱠᱟᱹᱨ ᱟᱠᱟᱱ ᱠᱚ ᱢᱟᱱᱚᱛ ᱟᱨ ᱥᱤᱨᱯᱷᱟᱹ ᱞᱮ ᱮᱢᱟ ᱠᱚᱣᱟ ᱾ ᱟᱞᱮ ᱨᱮᱱ ᱥᱚᱦᱮᱫ ᱠᱚ ᱥᱟᱶᱛᱟ ᱥᱮᱣᱟ, ᱪᱮᱛᱷᱟᱣ ᱯᱟᱥᱱᱟᱣ ᱟᱨ ᱥᱮᱪᱮᱫ ᱨᱮ ᱟᱹᱫᱤᱵᱟᱹᱥᱤ ᱟᱹᱭᱫᱟᱹᱨ ᱞᱟᱹᱜᱤᱫ ᱠᱚ ᱠᱟᱹᱢᱤᱭᱟ ᱾"
  },
  'about_p5': {
    en: "As we move forward, SESWA continues to adapt to the changing landscape of engineering education while remaining steadfast in its core values. We invite all Santal engineering students and well-wishers to join us in our mission to build a stronger, more empowered community.",
    ol: "ᱞᱟᱦᱟ ᱥᱮᱱ ᱪᱟᱞᱟᱣ ᱛᱩᱞᱩᱡ, SESWA ᱫᱚ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱥᱮᱪᱮᱫ ᱨᱮᱱᱟᱜ ᱵᱚᱫᱚᱞᱚᱜ ᱠᱟᱱ ᱚᱠᱛᱚ ᱥᱟᱶ ᱛᱟᱞ ᱢᱤᱞᱟᱹᱣ ᱠᱟᱛᱮ ᱟᱡᱟᱜ ᱢᱩᱞ ᱡᱚᱥ ᱨᱮ ᱛᱟᱦᱮᱸᱱᱟ ᱾ ᱟᱞᱮ ᱡᱚᱛᱚ ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱟᱨ ᱥᱩᱵᱷᱮᱪᱷᱩ ᱠᱚ ᱱᱚᱣᱟ ᱢᱤᱥᱚᱱ ᱨᱮ ᱥᱮᱞᱮᱫᱚᱜ ᱞᱟᱹᱜᱤᱫ ᱞᱮ ᱱᱮᱣᱛᱟ ᱮᱫ ᱠᱚᱣᱟ ᱾"
  },
  'vision_desc': {
    en: "To be the leading welfare association that transforms the lives of Santal engineering students, fostering a community of excellence, integrity, and cultural pride.",
    ol: "ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚᱣᱟᱜ ᱡᱤᱭᱚᱱ ᱵᱚᱫᱚᱞ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱫ ᱢᱟᱨᱟᱝ ᱜᱟᱶᱛᱟ ᱵᱮᱱᱟᱣ, ᱡᱟᱦᱟᱸ ᱨᱮ ᱡᱤᱛᱠᱟᱹᱨ, ᱥᱟᱹᱨᱤ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱨᱮᱱᱟᱜ ᱢᱟᱱᱚᱛ ᱛᱟᱦᱮᱸᱱᱟ ᱾"
  },
  'mission_desc': {
    en: "To provide a supportive environment for academic growth, financial assistance, and cultural preservation, empowering our members to excel in their professional and personal lives.",
    ol: "ᱥᱮᱪᱮᱫ ᱞᱟᱦᱟᱱᱛᱤ, ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱡᱚᱜᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱫ ᱜᱚᱲᱚ ᱟᱱ ᱴᱷᱟᱶ ᱮᱢ, ᱡᱟᱦᱟᱸ ᱛᱮ ᱟᱵᱚ ᱨᱮᱱ ᱥᱚᱦᱮᱫ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱠᱟᱹᱢᱤ ᱟᱨ ᱡᱤᱭᱚᱱ ᱨᱮ ᱠᱚ ᱡᱤᱛᱠᱟᱹᱨ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ ᱾"
  },
  'general_body': { en: 'GENERAL BODY (2025 – 2026)', ol: 'ᱡᱮᱱᱮᱨᱟᱞ ᱵᱚᱰᱤ (᱒᱐᱒᱕ – ᱒᱐᱒᱖)' },
  'post': { en: 'Post', ol: 'ᱯᱳᱥᱴ' },
  'name': { en: 'Name', ol: 'ᱧᱩᱛᱩᱢ' },
  'institution': { en: 'Institution', ol: 'ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ' },
  'contact_no': { en: 'Contact No.', ol: 'ᱥᱟᱹᱜᱟᱹᱭ ᱱᱚᱢᱵᱚᱨ' },
  'official_announcement': { en: 'Official Announcement:', ol: 'ᱚᱯᱷᱤᱥᱤᱭᱟᱞ ᱱᱳᱴᱤᱥ:' },
  'announcement_text': {
    en: 'All Members are hereby informed that according to our last meeting held on 9th November, the new General Body (GB) member formation for the session 2025-2026 was successfully conducted. The above listed members have been elected to lead the association for the current tenure.',
    ol: 'ᱡᱚᱛᱚ ᱥᱚᱦᱮᱫ ᱠᱚ ᱵᱟᱰᱟᱭ ᱞᱟᱹᱜᱤᱫ ᱡᱮ ᱙ ᱱᱚᱵᱷᱮᱢᱵᱚᱨ ᱦᱩᱭ ᱟᱠᱟᱱ ᱜᱟᱞᱢᱟᱨᱟᱣ ᱞᱮᱠᱟᱛᱮ, ᱒᱐᱒᱕-᱒᱐᱒᱖ ᱥᱮᱥᱚᱱ ᱞᱟᱹᱜᱤᱫ ᱱᱟᱣᱟ ᱡᱮᱱᱮᱨᱟᱞ ᱵᱚᱰᱤ (GB) ᱵᱮᱱᱟᱣ ᱦᱩᱭ ᱟᱠᱟᱱᱟ ᱾ ᱪᱮᱛᱟᱱ ᱨᱮ ᱚᱞ ᱟᱠᱟᱱ ᱥᱚᱦᱮᱫ ᱠᱚ ᱱᱤᱭᱟᱹ ᱥᱮᱨᱢᱟ ᱞᱟᱹᱜᱤᱫ ᱠᱚ ᱵᱟᱪᱷᱚᱱ ᱟᱠᱟᱱᱟ ᱾'
  },
  'hero_text': {
    en: 'Empowering Santal Engineering Students through unity, support, and cultural preservation since 2003.',
    ol: '᱒᱐᱐᱓ ᱠᱷᱚᱱ ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱢᱤᱫ ᱡᱩᱢᱤᱫᱽ, ᱜᱚᱲᱚ, ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱡᱚᱜᱟᱣ ᱛᱟᱞᱟᱛᱮ ᱫᱟᱲᱮᱭᱟᱱ ᱵᱮᱱᱟᱣ ᱨᱮ ᱾'
  },
  'latest_announcements': { en: 'Latest Announcements', ol: 'ᱱᱟᱣᱟ ᱱᱳᱴᱤᱥ' },
  'view_all': { en: 'View All', ol: 'ᱡᱚᱛᱚ ᱧᱮᱞ' },
  'copyright': { en: '© 2026 Santal Engineering Students\' Welfare Association (W.B.). All Rights Reserved.', ol: '© ᱒᱐᱒᱖ ᱥᱟᱱᱛᱟᱞ ᱤᱧᱡᱤᱱᱤᱭᱟᱨᱤᱝ ᱥᱴᱩᱰᱮᱱᱴᱥ ᱳᱭᱮᱞᱯᱷᱮᱭᱟᱨ ᱮᱥᱳᱥᱤᱭᱮᱥᱮᱱ (ᱯ.ᱵ.) ᱾ ᱡᱚᱛᱚ ᱟᱹᱭᱫᱟᱹᱨ ᱫᱚᱦᱚ ᱟᱠᱟᱱᱟ ᱾' }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('seswa_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('seswa_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
