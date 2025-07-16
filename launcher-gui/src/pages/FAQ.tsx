import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is this?',
      answer:
        'Manic Miners is a complete faithful remake of the 1999 game LEGO Rock Raiders. It has been in development since May 2019 and is developed by a single person; Baraklava.',
    },
    {
      question: 'Is this game sponsored by The Lego Group?',
      answer:
        'This game is not authorized, sponsored, endorsed, or has anything to do with The Lego Group, although I definitely wish I worked for them!',
    },
    {
      question: 'Why are you doing this project?',
      answer:
        'For fun! Rock Raiders is my favourite LEGO theme, from a time when LEGO was a company of experimentation and fearlessness. While those times were monetarily harsh for LEGO, they have left an impression that I want to carry on by remaking this game and hopefully keep the memory of this franchise alive. During college, I discovered a love for programming, and my love for Lego was also rekindled. I saw an opportunity to create a Rock Raiders remake with a standard of quality that I wanted to play myself and just went for it!',
    },
    {
      question: 'Is the game going to cost anything?',
      answer:
        'The game will always be free. Such is the spirit of the Lego community, and I just want to make a really neat game for this niche but loving fanbase. After I feel finished with the game, I might consider pursuing a commercial spiritual successor years down the line, but Manic Miners will always be free and a labor of love.',
    },
    {
      question: 'This is your first game and you are a solo developer. What makes you think you can complete this project on your own?',
      answer:
        "I work hard, I program well, and my pipelines for the project are insanely efficient. Rather than being a Lego fan driven by will alone, I have a really solid engineering and programming basis to stand on, as well as the simplest programming IDE you can imagine. No one has gotten as far as I have gotten, but no one has also had the same premise I have. I aim to keep programming in my spare time until it is done.\n\nAnd while it's true I haven't made any games before, I've been programming quite a lot. Unreal Engine is incredibly intuitive in addition to the quick programming pipeline it provides, and I've had little to no troubles making the game work, as it mostly comes down to doing maths.\n\nAlso if you're reading this, I already made it :3",
    },
    {
      question: 'Is the game open source?',
      answer:
        'The game is not open source, but might be at some point in the future when I feel done with it. I am however looking into modding support.',
    },
    {
      question: 'Will it be available for Mac/Linux?',
      answer:
        'I hope that it eventually will, but it might take some time. In the meantime, I have heard people having success running it with Wine/Proton on Linux, and the Game Porting Toolkit on Mac.',
    },
    {
      question: 'How can I contribute to the project?',
      answer:
        "As I've mentioned, I am the only programmer, and am therefore not looking for programming help. I am however definitely open to other collaborations! If you make assets that you want to contribute to the game. Such as art, models or other fun stuff that fits the game, you can share them in my Discord or reach out to me directly.",
    },
    {
      question: 'What about donations and Patreon?',
      answer:
        "I'm not looking for any monetary returns, I don't need the money. Please enjoy the game guilt-free! I do this because it's rewarding in other ways. To emphasize this, I'm refusing all donations and funding possibilities. Refusing donations also allows me to work at my own pace. If you want to contribute anything that isn't money, I sometimes request help over at the Discord server. I'm always open to chat!",
    },
    {
      question: 'When will feature x be added?',
      answer:
        "If there is a feature you want to see added, you can discuss it in my Discord server! However, every requested feature cannot be added, even if it's good, because it takes time to implement. Please consider any plans or promises that have been made during development to be wishes rather than promises.",
    },
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto relative">
      <div className="container mx-auto p-6 flex-1 min-h-0">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center energy-glow">
                <Info className="w-6 h-6 text-primary-foreground animate-pulse-energy" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">Find answers to the most common questions about Manic Miners</p>
              </div>
            </div>
          </div>

          {/* Launcher Info */}
          <Card className="mining-surface border-primary/20 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <p>
                  <strong>About This Launcher:</strong> This launcher was built by Wal33D to enhance the ManicMiners experience in homage to
                  Baraklava's hard work on creating this amazing Rock Raiders remake. This is an open source project - feel free to
                  contribute on{' '}
                  <a
                    href="https://github.com/Wal33D/manic-miners-launcher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                  !
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Discord Button */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => window.open('https://discord.gg/C3hH7mFsMv', '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Join Discord
            </Button>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="mining-surface border-primary/20 shadow-lg overflow-hidden">
                <CardHeader className="border-b border-border/50 pb-4">
                  <CardTitle className="text-lg text-primary">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-muted-foreground whitespace-pre-line">{faq.answer}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="mining-surface border-primary/20 shadow-lg overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-lg text-primary">Still have questions?</CardTitle>
                <CardDescription>Join our Discord community to get help from other players and the developer!</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Button onClick={() => window.open('https://discord.gg/C3hH7mFsMv', '_blank')} className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Discord Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default FAQ;
