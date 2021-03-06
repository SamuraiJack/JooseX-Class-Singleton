Role('JooseX.Class.Singleton', {
    
    has : {
        forceInstance           : Joose.I.Object,
        instance                : null
    },
    
    
    
    override : {
        
        defaultConstructor : function () {
            var meta        = this
            var previous    = this.SUPER()
            
            this.adaptConstructor(previous)
            
            return function (forceInstance, params) {
                if (forceInstance == meta.forceInstance) return previous.apply(this, params) || this
                
                var instance = meta.instance
                
                if (instance) {
                    if (meta.hasMethod('configure')) instance.configure.apply(instance, arguments)
                } else
                    meta.instance = new meta.c(meta.forceInstance, arguments)
                    
                return meta.instance
            }
        }        
    }
    

})


Joose.Namespace.Manager.my.register('Singleton', Class({
    isa     : Joose.Meta.Class,
    meta    : Joose.Meta.Class,
    
    does    : JooseX.Class.Singleton
}))



/**

Name
====


JooseX.Class.Singleton - a trait, turning your class into singleton


SYNOPSIS
========

        Class("Some.Class", {
        
            trait : JooseX.Class.Singleton,
            
            has : {
                attribute   : null
            },
            
            
            methods : {
            
                configure : function (params) {
                }
            }
        })
        
        var instance1 = new Some.Class({
            attribute : 'value'
        })
        
        var instance2 = new Some.Class()
        
        //preferred way
        var instance3 = Some.Class()
        
        t.ok(instance1 == instance2 && instance2 == instance3, '3 ways to access a singleton instance - choose one')
        
        
        //or equivalent declaration

        Singleton("Some.Class", {
        
            has : {
                attribute   : null
            },
            
            
            methods : {
            
                configure : function (params) {
                    this.attribute = params
                }
            }
        })


DESCRIPTION
===========

`JooseX.Class.Singleton` is a meta-role, turning your class into singleton.

You can apply it as a trait (the 1st example in the synopsys), or you can use the new declaration helper: `Singleton`


USAGE
=====

To receive the singleton instance use the constructor of the class. You can use it in any form - with or without `new` keyword.

        Singleton('Some.Class', {
            ...
        })
        
        var instance = Some.Class()
        
        //or

        var instance = new Some.Class()
        
        
The first call to constructor will *instantiate* singleton. The parameters passed to this first call, will be passed into actual underlaying constructor.

The further calls to constructor will *reconfigure* singleton. The parameters passed to further calls, will be passed into call to `configure` method
of the class (if it has one).


INHERITANCE
===========

Note, that by default, the subclasses uses the same metaclass as their parents. Thus, if you'll subclass the singleton, the resulting class will be 
a singleton either (even without applied traits or `Singleton` helper usage):

        Class('Some.Singleton', {
            trait : JooseX.Class.Singleton,
            ...
        })

        
        // this class will be a singleton as well
        
        Class('Another.Class', {
            isa : Some.Singleton
        })

If you'd like to avoid this - then specify the metaclass explicitly:

        // this class will be a usual class 
        // inheriting all attributes/methods of Some.Singleton
        // but not its "singleton-nessment"

        Class('Another.Class', {
            meta : Joose.Meta.Class,
            
            isa : Some.Singleton
        })


GETTING HELP
============

This extension is supported via github issues tracker: <http://github.com/SamuraiJack/JooseX-Class-Singleton/issues>

For general Joose questions you can also visit #joose on irc.freenode.org or the forum at: <http://joose.it/forum>
 


SEE ALSO
========

Web page of this module: <http://github.com/SamuraiJack/JooseX-Class-Singleton/>

General documentation for Joose: <http://Joose.github.com/Joose>


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://github.com/SamuraiJack/JooseX-Class-Singleton/issues>



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/
