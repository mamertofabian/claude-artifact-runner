import React, { useState } from "react";
import {
  Folder,
  File,
  ArrowRight,
  Settings,
  Code,
  ExternalLink,
} from "lucide-react";

const DjangoStaticFilesExplainer = () => {
  const [activeSection, setActiveSection] = useState("static");
  const [showCodeExample, setShowCodeExample] = useState(false);

  const sections = {
    static: {
      title: "Static Files",
      description:
        "Files that are part of your application, like CSS, JavaScript, and images.",
      path: "/myapp/static/myapp/",
      files: ["styles.css", "script.js", "logo.png"],
      code: `# In your HTML template
<link rel="stylesheet" href="{% static 'myapp/styles.css' %}">
<script src="{% static 'myapp/script.js' %}"></script>
<img src="{% static 'myapp/logo.png' %}" alt="Logo">`,
      explanation:
        "Use the {% static %} template tag to reference static files in your HTML.",
    },
    staticRoot: {
      title: "STATIC_ROOT",
      description:
        "The directory where Django collects all static files for deployment.",
      path: "/var/www/static/",
      files: [
        "myapp/styles.css",
        "myapp/script.js",
        "myapp/logo.png",
        "admin/admin.css",
      ],
      code: `# In settings.py
STATIC_ROOT = '/var/www/static/'

# Run this command to collect static files
python manage.py collectstatic`,
      explanation:
        "STATIC_ROOT is used when you deploy your app. The collectstatic command copies all static files to this directory.",
    },
    staticUrl: {
      title: "STATIC_URL",
      description: "The URL to use when referring to static files.",
      path: "https://example.com/static/",
      files: ["myapp/styles.css", "myapp/script.js", "myapp/logo.png"],
      code: `# In settings.py
STATIC_URL = '/static/'

# In production, you might use:
STATIC_URL = 'https://cdn.example.com/static/'`,
      explanation:
        "STATIC_URL is the base URL from which static files will be served. In production, this might be a CDN URL.",
    },
    mediaRoot: {
      title: "MEDIA_ROOT",
      description: "The directory where user-uploaded files are stored.",
      path: "/var/www/media/",
      files: ["user_uploads/profile.jpg", "documents/report.pdf"],
      code: `# In settings.py
MEDIA_ROOT = '/var/www/media/'
MEDIA_URL = '/media/'

# In your models.py
class UserProfile(models.Model):
    avatar = models.ImageField(upload_to='user_uploads/')`,
      explanation:
        "MEDIA_ROOT is for user-uploaded content. Use FileField or ImageField in your models to handle uploads.",
    },
  };

  const handleToggleCode = () => {
    setShowCodeExample(!showCodeExample);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Django Static Files Explainer
      </h1>
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-6">
        {Object.keys(sections).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              activeSection === key
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
            onClick={() => setActiveSection(key)}
          >
            {sections[key].title}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">
          {sections[activeSection].title}
        </h2>
        <p className="mb-4 text-gray-700">
          {sections[activeSection].description}
        </p>
        <div className="flex items-center mb-4 bg-gray-100 p-3 rounded">
          <Folder className="text-yellow-500 mr-2" />
          <span className="font-mono text-sm">
            {sections[activeSection].path}
          </span>
        </div>
        <div className="pl-6 mb-4">
          {sections[activeSection].files.map((file, index) => (
            <div key={index} className="flex items-center mb-2">
              <File className="text-gray-500 mr-2" size={16} />
              <span className="font-mono text-sm">{file}</span>
            </div>
          ))}
        </div>
        {activeSection === "staticRoot" && (
          <div className="mt-4 flex items-center bg-green-100 p-3 rounded">
            <ArrowRight className="text-green-500 mr-2" />
            <span className="text-sm">
              Files collected from all apps' static directories
            </span>
          </div>
        )}
        {activeSection === "staticUrl" && (
          <div className="mt-4 flex items-center bg-blue-100 p-3 rounded">
            <Settings className="text-blue-500 mr-2" />
            <span className="text-sm">
              Set in settings.py: STATIC_URL = '/static/'
            </span>
          </div>
        )}
        <div className="mt-6">
          <button
            onClick={handleToggleCode}
            className="flex items-center bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-200"
          >
            <Code className="mr-2" size={18} />
            {showCodeExample ? "Hide Code Example" : "Show Code Example"}
          </button>
          {showCodeExample && (
            <div className="mt-4 bg-gray-800 p-4 rounded-lg">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {sections[activeSection].code}
              </pre>
              <p className="text-white mt-2 text-sm">
                {sections[activeSection].explanation}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 text-center">
        <a
          href="https://docs.djangoproject.com/en/stable/howto/static-files/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-500 hover:text-blue-600"
        >
          Learn more about Django static files
          <ExternalLink className="ml-1" size={16} />
        </a>
      </div>
    </div>
  );
};

export default DjangoStaticFilesExplainer;
