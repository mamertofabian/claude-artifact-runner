import React, { useEffect, useState } from 'react';
import { ArrowRight, Settings, FileText, Sparkles, ExternalLink, Code, CheckCircle } from 'lucide-react';

const ArchSpecWorkflow = () => {
  // Adding animation state
  const [activeStep, setActiveStep] = useState(null);
  
  // Enhanced color palette
  const colors = {
    background: 'linear-gradient(135deg, #4169fb 0%, #3451c7 100%)',
    darkBlue: '#3a55d9',
    light: '#ffffff',
    accent: '#d4e3ff',
    highlight: '#e6edff',
    glow: 'rgba(255, 255, 255, 0.8)',
    cardGradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    activeCardGradient: 'linear-gradient(180deg, rgba(212, 227, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
    progressLine: 'rgba(255, 255, 255, 0.3)',
    progressLineActive: 'rgba(255, 255, 255, 0.9)',
  };

  // Workflow steps with icons and descriptions
  const steps = [
    {
      name: 'Project Setup',
      icon: <Settings size={32} />,
      description: 'Define project parameters and requirements'
    },
    {
      name: 'Specification',
      icon: <FileText size={32} />,
      description: 'Create detailed software specifications'
    },
    {
      name: 'AI Enhancement',
      icon: <Sparkles size={32} />,
      description: 'AI analyzes and improves specifications'
    },
    {
      name: 'Export',
      icon: <ExternalLink size={32} />,
      description: 'Export implementation-ready blueprints'
    },
    {
      name: 'Implementation',
      icon: <Code size={32} />,
      description: 'Transform specs into production code'
    }
  ];

  useEffect(() => {
    // Set initial active step
    setActiveStep(6);
    
    // Cleanup function to reset active step on unmount
    return () => {
      setActiveStep(null);
    };
  }, []);

  return (
    <div style={{
      width: '1270px',
      height: '760px',
      background: colors.background,
      padding: '40px',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.light,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
        zIndex: 0,
        opacity: 0.6,
      }} />

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.floor(Math.random() * 8) + 4 + 'px',
          height: Math.floor(Math.random() * 8) + 4 + 'px',
          backgroundColor: colors.light,
          borderRadius: '50%',
          opacity: Math.random() * 0.2 + 0.1,
          top: Math.floor(Math.random() * 100) + '%',
          left: Math.floor(Math.random() * 100) + '%',
          animation: `float ${Math.floor(Math.random() * 20) + 10}s infinite ease-in-out`,
          zIndex: 0,
        }} />
      ))}

      {/* Title */}
      <div style={{
        marginBottom: '60px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: '600',
          color: colors.accent,
          marginBottom: '12px',
          opacity: 0.9
        }}>
          ArchSpec
        </div>
        <h1 style={{
          fontSize: '56px',
          fontWeight: '800',
          marginBottom: '16px',
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #d4e3ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
        }}>User Workflow</h1>
        <p style={{
          fontSize: '20px',
          opacity: '0.9',
          maxWidth: '800px',
          lineHeight: '1.6'
        }}>
          Streamlining development with implementation-ready specifications
        </p>
      </div>

      {/* Workflow Steps Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1100px',
        gap: '8px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Progress Line */}
        <div style={{
          position: 'absolute',
          height: '4px',
          top: '36px',
          left: '140px',
          right: '140px',
          backgroundColor: colors.progressLine,
          zIndex: 1,
        }}>
          {/* Active Progress */}
          <div style={{
            height: '100%',
            width: activeStep ? `${activeStep * 25}%` : '0%',
            backgroundColor: colors.progressLineActive,
            transition: 'width 0.5s ease-in-out',
            boxShadow: `0 0 10px ${colors.glow}`,
          }} />
        </div>

        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            {/* Step Card */}
            <div 
              style={{
                background: activeStep === index + 1 ? colors.activeCardGradient : colors.cardGradient,
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '28px 16px',
                width: '190px',
                height: '240px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxShadow: activeStep === index + 1 
                  ? '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.2)'
                  : '0 8px 24px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                border: activeStep === index + 1 
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                transform: activeStep === index + 1 ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                zIndex: activeStep === index + 1 ? 3 : 2,
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={() => setActiveStep(index + 1)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Step Number */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: colors.darkBlue,
                color: colors.light,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                border: `2px solid ${colors.accent}`,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}>
                {index + 1}
              </div>
              
              {/* Icon Circle */}
              <div style={{
                background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #2c43af 100%)`,
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: `1px solid ${colors.accent}`,
                boxShadow: activeStep === index + 1 
                  ? `0 0 20px rgba(212, 227, 255, 0.5), 0 0 0 2px ${colors.accent}`
                  : 'none',
                transition: 'all 0.3s ease',
              }}>
                {step.icon}
                
                {/* Completion Check (for visual enhancement) */}
                {activeStep && activeStep > index + 1 && (
                  <div style={{
                    position: 'absolute',
                    right: '-5px',
                    bottom: '-5px',
                    backgroundColor: '#4BB543',
                    borderRadius: '50%',
                    padding: '2px',
                  }}>
                    <CheckCircle size={20} />
                  </div>
                )}
              </div>
              
              {/* Step Name */}
              <h3 style={{
                textWrap: 'nowrap',
                fontSize: '20px',
                fontWeight: '600',
                margin: '0 0 10px 0',
                background: activeStep === index + 1 
                  ? 'linear-gradient(to bottom, #FFFFFF, #d4e3ff)'
                  : 'none',
                WebkitBackgroundClip: activeStep === index + 1 ? 'text' : 'none',
                WebkitTextFillColor: activeStep === index + 1 ? 'transparent' : 'inherit',
              }}>
                {step.name}
              </h3>
              
              {/* Step Description */}
              <p style={{
                fontSize: '15px',
                margin: 0,
                opacity: activeStep === index + 1 ? 1 : 0.8,
                lineHeight: '1.5',
                maxWidth: '90%',
              }}>
                {step.description}
              </p>
            </div>
            
            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                zIndex: 1,
                padding: '0 2px',
              }}>
                <ArrowRight 
                  color={colors.light} 
                  size={28} 
                  style={{
                    opacity: activeStep && activeStep > index + 1 ? 1 : 0.6,
                    filter: activeStep && activeStep > index + 1 
                      ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.7))' 
                      : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
        top: '0%',
        left: '0%',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
        bottom: '0%',
        right: '0%',
        zIndex: 0
      }} />
      
      {/* ArchSpec Logo */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        padding: '10px 20px',
        borderRadius: '40px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}>
          <Sparkles size={24} color={colors.light} style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }} />
        </div>
        <span style={{
          fontSize: '24px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #d4e3ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ArchSpec
        </span>
      </div>

      {/* Add style tag for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            25% {
              transform: translateY(-10px) translateX(5px);
            }
            50% {
              transform: translateY(5px) translateX(-5px);
            }
            75% {
              transform: translateY(-5px) translateX(10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ArchSpecWorkflow;
