import React, { useEffect } from 'react';

const RadioPage = () => {
  useEffect(() => {
    // Dynamically load the Caster.fm script
    const script = document.createElement('script');
    script.src = "//cdn.cloud.caster.fm/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed, though usually embed scripts are tricky to unload cleanly
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <h1 className="text-4xl font-bold text-blue-500">Radio Station</h1>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl flex flex-col items-center">
        {/* User Provided Embed Code */}
        <div
            className="cstrEmbed"
            data-type="newStreamPlayer"
            data-publictoken="cfecd9c0-1cc4-420c-8656-c2d4f26ad1b1"
            data-theme="dark"
            data-color="C8A05C"
            data-channelid=""
            data-rendered="false"
        >
            <a href="https://www.caster.fm">Shoutcast Hosting</a>
            <a href="https://www.caster.fm">Stream Hosting</a>
            <a href="https://www.caster.fm">Radio Server Hosting</a>
        </div>
      </div>

      <div className="text-gray-500 text-sm max-w-md text-center">
        Note: The radio player loads from an external source. If it doesn't appear, please check your internet connection or ad-blocker settings.
      </div>
    </div>
  );
};

export default RadioPage;
